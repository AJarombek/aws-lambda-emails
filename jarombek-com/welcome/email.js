/**
 * Send a welcome Email when someone subscribes
 * @author Andrew Jarombek
 * @since 6/5/2018
 */

const send = require('send-email');

/**
 * Send a welcome email after a user subscribes
 * @param to Recipient email address
 * @param verify_cd Verification code
 * @param unsub_cd Unsubscribe code
 */
function sendWelcomeEmail(to, verify_cd, unsub_cd) {
    const subject = "Andrew Jarombek's Software Development Blog Subscription";
    const attachments = [
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
    ];

    const htmlFilename="email";
    const cssFilename="email";

    const replacementValues = { verify: verify_cd, unsub: unsub_cd };

    send(subject, to, attachments, htmlFilename, cssFilename, replacementValues);
}

module.exports = sendWelcomeEmail;
