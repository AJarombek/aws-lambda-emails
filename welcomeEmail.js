/**
 * Send a welcome Email when someone subscribes
 * @author Andrew Jarombek
 * @since 6/5/2018
 * @sources [
 *      http://nodemailer.blogspot.com/,
 *      https://nodemailer.com/smtp/oauth2/#example-5,
 *      https://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one
 * ]
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const juice = require('juice');

/**
 * Send a welcome email after a user subscribes
 * @param to - recipient email address
 * @param verify_cd - verification code
 * @param unsub_cd - unsubscribe code
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

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: '185890864563-6f8l8d9rn7s2qao51150k9eqt1dpbnr8.apps.googleusercontent.com',
            clientSecret: 'ducKth5OeJu9_RDQcB7Ug5Ps'
        }
    });

    transport.sendMail({
        from: 'Andrew Jarombek<andrew@jarombek.com>',
        to,
        subject: 'Andrew Jarombek\'s Software Development Blog Subscription',
        html: styledHtml,
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
        ],
        auth: {
            user: 'andrew@jarombek.com',
            refreshToken: '1/iTjqIxJDBo6b6rZg9sJ5AeF-N-zLnUIexsa-_g0x3w820I1ga-yopF7_6a7E4vJk',
            accessToken: 'ya29.GlvbBdzLb32bi-2OvaXgwT6xSj_FFdQ1BeEEKD73vxIe4_Hct9Pjy_afnMzXM0kiz5B22jYKqg3CXEScL1iXfhuzUvG41kvrFQk1EPSWmSFvcOJnLcsH3QQcV0FR',
            expires: 3600
        }
    }, (err) => {
        if (err) {
            console.error(`Something went wrong sending mail: ${err}`);
        }
    });
}

/**
 * Replace a template item in a string.  Templates are denoted by the {{<template>}} pattern
 * @param string - the string with the template items
 * @param substring - the <template> identifier
 * @param replacement - string that will replace the template item
 * @return {Object|string|void|*} - A new string - note strings are immutable so a new string
 * object will be made.
 */
function replace(string, substring, replacement) {
    return string.replace(`{{${substring}}}`, replacement);
}

module.exports = sendWelcomeEmail;