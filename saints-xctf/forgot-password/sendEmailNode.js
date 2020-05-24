/**
 * Send an email via Node.js.
 * @author Andrew Jarombek
 * @since 5/24/2020
 */

const sendForgotPasswordEmail = require('./email');

const [_, __, to, code, username, firstName, lastName] = process.argv;

sendForgotPasswordEmail(to, code, username, firstName, lastName);
