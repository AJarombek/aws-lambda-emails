/**
 * Send an email via the node command line operation
 * Use case: "node sendEmailNode andrew@jarombek.com"
 * @author Andrew Jarombek
 * @since 6/10/2018
 */

const sendWelcomeEmail = require('./welcomeEmail');

// Pass once command line argument with the recipient email
const to = process.argv[2];

sendWelcomeEmail(to);