/**
 * Send an email via an AWS Lambda function
 * @author Andrew Jarombek
 * @since 6/10/2018
 */

const AWS = require('aws-sdk');
const sendWelcomeEmail = require('./welcomeEmail');

AWS.config.update({region: 'us-east-2'});

/**
 * Invoke an AWS function via the handler object
 * @param event - information about the AWS Lambda function request
 * @param context - runtime information regarding the AWS lambda function
 * @param callback - used to return information back to the caller - if the callback
 * is not specified AWS Lambda will send back {null} to the caller
 */
exports.sendWelcomeEmail = (event, context, callback) => {

    sendWelcomeEmail(event.to, event.verify, event.unsub);

    // Indicate a successful call with no extra information
    callback(null);
};