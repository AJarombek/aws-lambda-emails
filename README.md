# aws-lambda-emails

> *Formerly jarombek-com-emails*

### Overview

Module which allows AWS Lambda functions to send emails.  Used by my `saintsxctf.com` and `jarombek.com` 
applications.

### Commands

```bash
# Create an AWS Lambda ZIP file.
rm welcomeEmail.zip
zip -r welcomeEmail.zip .
```

### Files

| Filename         | Description                                                                    |
|------------------|--------------------------------------------------------------------------------|
| `index.js`       | Entrypoint to the module.                                                      |
| `index.d.ts`     | Type definitions for the module so that this code can be used with TypeScript. |
| `setup.sh`       | Bash commands executed while working on the module.                            |
| `package.json`   | Dependencies and metadata about the module.                                    |
| `yarn.lock`      | Lock file with the specific versions of dependencies used.                     |

### Resources

**Outdated Resources**

1. [NodeJS Gmail OAuth2](http://nodemailer.blogspot.com/)
2. [NodeMailer Auth](https://nodemailer.com/smtp/oauth2/#example-5)
3. [NodeMailer Refresh Token](https://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one)

**Current Resources**

1. [Get SecretsManager Secret](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SecretsManager.html#getSecretValue-property)
