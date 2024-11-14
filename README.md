## Setup the mailing server

### Configure postfix

Postfix is used as the mailing server to send timecapsules to users. It is lightweight and can run on limited resources. Postfix must be configured as a send-only server, in this case we will be using it to relay mail through Gmail.

> Note: Postfix is only available on Linux but this can work on Windows using WSL with a bridged network.

Follow the steps outlined in this article to setup the mail server:
https://www.linode.com/docs/guides/configure-postfix-to-send-mail-using-gmail-and-google-workspace-on-debian-or-ubuntu/

After it's done, the server should be running on port 25. To ensure everything is setup correctly, run the following command:

`echo "Test mail" | mail -s "Test mail" recipient@example.com`

An email should be received at the receipient address.

### Setting up a cronjob

A cronjob is required to check the db for any capsules that need to be sent, process those capsules and send emails to the recipients.

To start the cronjob, run: `bun run cron`

This project uses `node-cron` to schedule a task to run every 3 hours. This can be configured in `src/scripts/cron.ts`. By default logs will be logged under `logs/sendlog.txt` when ever the task executes.

The mail is sent via a bash script located at `src/scripts/capsule-mailer.sh` and handles SMTP forwarding to the postfix mailing server that we setup earlier.

> Note: On windows, the cronjob executes the bash script in wsl. Make sure wsl is setup with the default distro configured correctly and has mailutils installed.
