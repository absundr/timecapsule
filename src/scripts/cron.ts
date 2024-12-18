import { getCapsulesToSend, markSent } from '$lib/server/capsules';
import { $ } from 'bun';
import fs, { appendFileSync } from 'fs';
import cron from 'node-cron';

function log(text: string) {
  appendFileSync('logs/sendlog.txt', text + '\n');
}
async function processAndSendTimecapsules() {
  log(new Date().toUTCString());
  log('Starting execution....');
  const successIds: string[] = [];
  const capsulesToSend = getCapsulesToSend();
  log(`Total capsules to send: ${capsulesToSend.length}`);
  for (const capsule of capsulesToSend) {
    let imgurl = '';
    if (capsule.picture) {
      imgurl += `${process.env.PUBLIC_API_URL}/api/user/${capsule.userId}/image/${capsule.picture}`;
    }
    try {
      // escape the '&' symbols so bash can properly replace the html
      capsule.message = capsule.message.replaceAll('&', '\\&');
      if (process.platform === 'win32') {
        await $`wsl -e bash src/scripts/capsule-mailer.sh ${capsule.email} ${capsule.title} ${capsule.message} ${imgurl}`;
      } else {
        await $`bash src/scripts/capsule-mailer.sh ${capsule.email} ${capsule.title} ${capsule.message} ${imgurl}`;
      }
      successIds.push(capsule.capsuleId);
    } catch (e) {
      log(`Failed sending capsule: ${capsule.capsuleId}\nError: ${e}`);
    }
  }
  log(
    `Total success: ${successIds.length}\nTotal failure: ${capsulesToSend.length - successIds.length}`,
  );
  log('Done');
  log('-----------------------------------');
  markSent(successIds);
}

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Run every 3 hours
cron.schedule('0 0 */3 * * *', async () => {
  await processAndSendTimecapsules();
});
