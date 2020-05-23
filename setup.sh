#!/usr/bin/env bash

# Author: Andrew Jarombek
# Date: 6/10/2018
# Install dependencies for the emails

yarn init

# NodeJS module for sending emails
yarn add nodemailer

# Dependency for inlining CSS in HTML
yarn add juice

# AWS support to set up AWS Lambda
yarn add aws-sdk