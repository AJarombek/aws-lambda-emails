### Overview

Email used on `jarombek.com` to welcome new subscribers to the website.

### Commands

**Local Execution**

```bash
# Set up the proper Node.js version
nvm use v13.9.0
node -v

# Send an email locally.
node sendEmailNode andrew@jarombek.com
```

**AWS Distribution**

```bash
# Create a zip file to be used as an AWS Lambda function.
zip -r ../../dist/JarombekComWelcomeEmail.zip .
```

### Files
