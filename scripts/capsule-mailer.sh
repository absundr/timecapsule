#!/bin/bash
recipient=$1
title=$2
message=$3
imgurl=$4

# Html content for the body
imgtag=""
if [[ -n $imgurl ]];
then
    imgtag="<img src=$imgurl alt='img' />"
fi

htmlBody="<html>
<body>
    <h1>$title</h1>
    <p>$message</p>
    $imgtag
</body>
</html>"

# Mailing meta data
mailer="From: Timecapsule <bashscript@localhost.com>"
subject="You've received a timecapsule"
header="Content-type: text/html"

echo $htmlBody | mail --content-type=text/html -s "$subject" -a "$mailer" $recipient