/**
 * Send a welcome Email when someone subscribes
 * @author Andrew Jarombek
 * @since 6/5/2018
 */

const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const fs = require('fs');
const juice = require('juice');

/**
 * Send a welcome email after a user subscribes
 * @param to Recipient email address
 * @param verify_cd Verification code
 * @param unsub_cd Unsubscribe code
 */
function sendWelcomeEmail(to="andrew@jarombek.com", verify_cd, unsub_cd) {

    // Read the contents of the HTML and CSS files to send with the email
    const html = fs.readFileSync('./welcomeEmail.html', 'utf8');
    const css = fs.readFileSync('./welcomeEmail.css', 'utf8');

    // Replace the templates in the HTML
    const htmlWithVerify = replace(html, 'verify', verify_cd);
    const htmlWithUnsub = replace(htmlWithVerify, 'unsub', unsub_cd);

    // Inline the CSS styles in the HTML document
    const styledHtml = juice.inlineContent(htmlWithUnsub, css);

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

function sendMail(transport, to, html) {
    transport.sendMail({
        from: 'Andrew Jarombek<andrew@jarombek.com>',
        to,
        subject: 'Andrew Jarombek\'s Software Development Blog Subscription',
        html,
        attachments: [
            {
                filename: 'blizzard.png',
                path: './assets/blizzard.png',
                cid: 'background@jarombek.com'
            },
            {
                filename: 'jarombek.png',
                path: './assets/jarombek.png',
                cid: 'jarombek@jarombek.com'
            },
            {
                filename: 'jarombek_signature.png',
                path: './assets/jarombek_signature.png',
                cid: 'signature@jarombek.com'
            }
        ]
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

module.exports = sendWelcomeEmail;
