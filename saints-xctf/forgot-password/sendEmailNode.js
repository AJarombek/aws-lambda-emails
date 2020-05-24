/**
 * Send an email via Node.js.
 * @author Andrew Jarombek
 * @since 5/24/2020
 */

const sendForgotPasswordEmail = require('./email');

const [_, __, to, verify_cd, unsub_cd] = process.argv;

sendForgotPasswordEmail(to, verify_cd, unsub_cd);
