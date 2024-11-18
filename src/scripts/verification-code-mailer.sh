#!/bin/bash
recipient=$1
code=$2

file_path="src/templates/verify.html"
htmlBody=$(<"$file_path")
htmlBody=${htmlBody/\#code\#/$code}

# Mailing meta data
mailer="From: Timecapsule <bashscript@localhost.com>"
subject="Verify your account"
header="Content-type: text/html"

echo $htmlBody | mail --content-type=text/html -s "$subject" -a "$mailer" $recipient