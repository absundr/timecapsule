param(
    [Parameter(Mandatory=$True,Position=1)]
    [string]$recipient,
    [Parameter(Mandatory=$True,Position=2)]
    [string]$title,
    [Parameter(Mandatory=$True,Position=3)]
    [string]$message,
    [Parameter(Mandatory=$False,Position=4)]
    [string]$imgurl
)

# Html content for the body
$imgtag = ""
if ($imgurl) {
    $imgtag = "<img src=$imgurl alt='img' />"
}

$htmlBody = @"
<html>
<body>
    <h1>$title</h1>
    <p>$message</p>
    $imgtag
</body>
</html>
"@

# Mailing meta data
$mailer = "Timecapsule <shellscript@localhost.com>"
$subject = "You've received a timecapsule"
$server = '127.0.0.1'
$port = '25' # Default port is 25

$sendMailMessageSplat = @{
    From = $mailer
    To = "<$recipient>"
    Subject = $subject
    SmtpServer = $server
    Port = $port
    Body = $htmlBody
}
Send-MailMessage @sendMailMessageSplat -BodyAsHtml 