/**
 * Module to send an email using NodeMailer and Gmail.
 * @author Andrew Jarombek
 * @since 5/23/2020
 */

const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const fs = require('fs');
const juice = require('juice');

/**
 * Main function to configure and send an email.
 * @param subject The subject line of the email.
 * @param to Who the email is sent to.
 * @param attachments Email attachment files.
 * @param htmlFilename Name of the html file to use for the email body.
 * @param cssFilename Name of the css file used to style the email body.
 * @param replacementValues Values in the HTML file to replace.  The name of the properties in the
 * object matches values in the html to replace.  These properties values are the
 * replacement values.
 */
function send(subject, to="andrew@jarombek.com", attachments = [], htmlFilename="email",
                   cssFilename="email", replacementValues = {}) {

    // Read the contents of the HTML and CSS files to send with the email
    let html = fs.readFileSync(`./${htmlFilename}.html`, 'utf8');
    const css = fs.readFileSync(`./${cssFilename}.css`, 'utf8');

    // Replace the templates in the HTML
    for (const key in replacementValues) {
        html = replace(html, key, replacementValues[key]);
    }

    // Inline the CSS styles in the HTML document
    const styledHtml = juice.inlineContent(html, css);

    console.info(styledHtml);

    const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' });
    secretsManager.getSecretValue({ SecretId: 'google-account-secret' }, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const { SecretString } = data;
            const secretObject = JSON.parse(SecretString);
            const password = secretObject.password;

            const transport = createTransport(password);
            sendMail(transport, subject, to, attachments, styledHtml);
        }
    });
}

/**
 * Configure how the email is transported.
 * @param password Application specific Gmail password used to send emails in a secure manner.
 */
function createTransport(password) {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'andrew@jarombek.com',
            pass: password
        }
    });
}

/**
 * Helper method to send the email and check for errors.
 * @param transport Transport object used to send emails.
 * @param subject The subject line of the email.
 * @param to Who the email is sent to.
 * @param attachments Email attachment files.
 * @param html Styled HTML file used as the email body.
 */
function sendMail(transport, subject, to, attachments, html) {
    transport.sendMail({
        from: 'Andrew Jarombek<andrew@jarombek.com>',
        to,
        subject,
        html,
        attachments
    }, (err) => {
        if (err) {
            console.error(`Something went wrong sending mail: ${err}`);
        }
    });
}

/**
 * Replace a template item in a string.  Templates are denoted by the {{<template>}} pattern
 * @param string -The string with the template items
 * @param substring The <template> identifier
 * @param replacement String that will replace the template item
 * @return {Object|string|void|*} A new string - note strings are immutable so a new string
 * object will be made.
 */
function replace(string, substring, replacement) {
    return string.replace(`{{${substring}}}`, replacement);
}

module.exports = send;
