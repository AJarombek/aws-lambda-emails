/**
 * Send an email via an AWS Lambda function
 * @author Andrew Jarombek
 * @since 5/24/2020
 */

const AWS = require('aws-sdk');
const sendForgotPasswordEmail = require('./email');

AWS.config.update({region: 'us-east-1'});

/**
 * Invoke an AWS function via the handler object
 * @param event - information about the AWS Lambda function request
 * @param context - runtime information regarding the AWS lambda function
 * @param callback - used to return information back to the caller.
 */
exports.sendForgotPasswordEmail = (event, context, callback) => {
    sendForgotPasswordEmail(event.to, event.code, event.username, event.firstName, event.lastName);
    callback(null);
};
