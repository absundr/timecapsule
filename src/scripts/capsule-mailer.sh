#!/bin/bash
recipient=$1
title=$2
message=$3
imgurl=$4

file_path="src/templates/capsule.html"
htmlBody=$(<"$file_path")
htmlBody=${htmlBody/\#title\#/$title}
htmlBody=${htmlBody/\#message\#/$message}
htmlBody=${htmlBody/\#imgurl\#/$imgurl}

# Mailing meta data
mailer="From: Timecapsule <bashscript@localhost.com>"
subject="You've received a timecapsule"
header="Content-type: text/html"

echo $htmlBody | mail --content-type=text/html -s "$subject" -a "$mailer" $recipient