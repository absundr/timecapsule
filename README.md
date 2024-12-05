[![.github/workflows/deploy.yml](https://github.com/absundr/timecapsule/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/absundr/timecapsule/actions/workflows/deploy.yml)

## Overview

Timecapsule is a web application built using SvelteKit to send digital timecapsules to yourself and receive them sometime in the future.

It is standalone and does not rely on cloud services, email providers, object storage or auth providers for hosting. Everything can be self-hosted on bare metal or run locally.

https://timecapsule.pod42.dev/

### Timecapsule uses:

- bun
- sveltekit
- sqlite
- local filesystem for object storage
- lucia auth
- postfix for mailing

The goal for this project was to build everything from scratch using simple tech that's not resource hungry so it can be hosted on minimal hardware without having to worry about costs.

## Getting started

### Install required packages

Start by installing bun, if you have node installed on your machine you can run

`npm install -g bun`

For alternate installation methods: https://bun.sh/docs/installation

Once done, install the required packages for the application

`bun i`

### Install sqlite driver

Download and install the sqlite binaries for your os from the download page: https://www.sqlite.org/download.html

I recommend installing the bundle that comes with the CLI as it may come in handy later on.

### Create the DB

Create the db along with the required tables.

`bun run update-db`

### Configure postfix

Postfix is used as the mailing server to send timecapsules to users. It is lightweight and can run on limited resources. Postfix must be configured as a send-only server, in this case we will be using it to relay mail through Gmail.

> Note: Postfix is only available on Linux but this can work on Windows using WSL on a bridged network.

Follow the steps outlined in this article to setup the mail server:
https://www.linode.com/docs/guides/configure-postfix-to-send-mail-using-gmail-and-google-workspace-on-debian-or-ubuntu/

After it's done, the server should be running on port 25. To ensure everything is setup correctly, run the following command:

`echo "Test mail" | mail -s "Test mail" recipient@example.com`

An email should be received at the receipient address.

## Run the application

Now that everything is setup, start the application

`bun start`

### Start the cronjob

A cronjob is required to check the db for any capsules that need to be sent, process those capsules and send emails to the recipients. To do this open another terminal window and run the following command.

`bun run cron`

This project uses `node-cron` to schedule a task to run every 3 hours. This can be configured in `src/scripts/cron.ts`. By default logs will be logged under `logs/sendlog.txt` when ever the task executes.

> Note: On windows, the cronjob executes the bash script in wsl. Make sure wsl is setup with the default distro configured correctly and has mailutils installed.

The mail is sent via a bash script located at `src/scripts/capsule-mailer.sh` and handles SMTP forwarding to the postfix mailing server that we setup earlier.

## And that's it

The application should be running and you should be able to signup and create timecapsules.
