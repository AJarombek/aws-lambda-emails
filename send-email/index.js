/**
 * Module to send an email.
 * @author Andrew Jarombek
 * @since 5/23/2020
 */

const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const fs = require('fs');
const juice = require('juice');

function send(subject, to="andrew@jarombek.com", attachments = [], htmlFilename="email",
                   cssFilename="email", replacementValues = {}) {

    // Read the contents of the HTML and CSS files to send with the email
    let html = fs.readFileSync(`./${htmlFilename}.html`, 'utf8');
    const css = fs.readFileSync(`./${cssFilename}.css`, 'utf8');

    // Replace the templates in the HTML
    for (const key in replacement_values) {
        html = replace(html, key, replacement_values[key]);
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
            sendMail(transport, to, styledHtml);
        }
    });
}

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
