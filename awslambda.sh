#!/usr/bin/env bash

# Author: Andrew Jarombek
# Date: 6/14/2018
# Work on the AWS Lambda function

# zip the directory for upload to AWS Lambda
# https://stackoverflow.com/a/34439125
zip -r welcomeEmail.zip .

# START : For reference only - this approach did not work

# Install the latest version of pip for awscli installation
pip3 install --upgrade pip

# Install the awscli - note pip3 (pip for pthon3.x) is used since I
# also have a local python2.x installation
pip3 install awscli --upgrade --user

# Find pythons local installation
# The output is a symbolic link, not the actually filesystem directory
which python3
# /usr/local/bin/python3

# Find where the symlink points
ls -al /usr/local/bin/python3

# Add python3 to the path
export PATH=~/Library/Frameworks/Python.framework/Versions/3.6/bin/:$PATH

# END : failed approach

# Install the awscli with homebrew
brew install awscli

# Check the awscli version
aws --version

# Configure the AWS CLI
# https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-quick-configuration
aws configure

# List the Lambda functions and their metadata
aws lambda list-functions

# Call the AWS Lambda function passing it a JSON payload
aws lambda invoke --function-name sendWelcomeEmail \
    --payload '{"to":"abjaro13@stlawu.edu"}' output.txt \
    && cat output.txt