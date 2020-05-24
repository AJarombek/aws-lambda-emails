/**
 * Send a forgot password email upon user request.
 * @author Andrew Jarombek
 * @since 5/24/2020
 */

const send = require('send-email');

/**
 * Send a forgot password email upon user request.
 * @param to Recipient email address.
 * @param code Verification code for users to enter when resetting their password.
 * @param username Username of the user requesting a password reset.
 * @param firstName First name of the user requesting a password reset.
 * @param lastName Last name of the user requesting a password reset.
 */
function sendForgotPasswordEmail(to, code, username, firstName, lastName) {
    const subject = "SaintsXCTF Password Reset Request";
    const attachments = [
        {
            filename: 'saintsxctf.png',
            path: './assets/saintsxctf.png',
            cid: 'saintsxctf@jarombek.com'
        }
    ];

    const htmlFilename="email";
    const cssFilename="email";

    const replacementValues = {
        code,
        username,
        firstName,
        lastName,
        prefix: process.env.PREFIX || ''
    };

    send(subject, to, attachments, htmlFilename, cssFilename, replacementValues);
}

module.exports = sendForgotPasswordEmail;
