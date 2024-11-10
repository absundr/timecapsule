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

wip
