/**
 * Send an email via the node command line operation
 * Use case: "node sendEmailNode andrew@jarombek.com"
 * @author Andrew Jarombek
 * @since 6/10/2018
 */

const sendWelcomeEmail = require('./email');

const [_, __, to, verify_cd, unsub_cd] = process.argv;

sendWelcomeEmail(to, verify_cd, unsub_cd);
