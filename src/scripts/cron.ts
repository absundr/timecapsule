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
    let args = `${capsule.email} "${capsule.title}" "${capsule.message}"`;
    if (capsule.picture) {
      args += ` ${process.env.PUBLIC_API_URL}/api/user/${capsule.userId}/image/${capsule.picture}`;
    }
    try {
      if (process.platform === 'win32') {
        await $`wsl -e bash src/scripts/capsule-mailer.sh ${args}`;
      } else {
        await $`bash src/scripts/capsule-mailer.sh ${args}`;
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
cron.schedule('* * */3 * * *', async () => {
  await processAndSendTimecapsules();
});
