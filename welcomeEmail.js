/**
 * Send a welcome Email when someone subscribes
 * @author Andrew Jarombek
 * @since 6/5/2018
 * @sources [http://nodemailer.blogspot.com/, https://nodemailer.com/smtp/oauth2/#example-5]
 */

const nodemailer = require('nodemailer');

const to = 'abjaro13@stlawu.edu';

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '843624715496-46041v1d4mi67j9pq1b69v9hofla5luk.apps.googleusercontent.com',
        clientSecret: 'a5fD3Ulzu1tBbZI3Tg9L2Kdw'
    }
});

transport.sendMail({
    from: 'andrew@jarombek.com',
    to,
    subject: 'Andrew Jarombek\'s Software Development Blog Subscription',
    text: '<div>Hello World</div>',
    auth: {
        user: 'andrew@jarombek.com',
        refreshToken: '1/sysZin_KovuBXt2mn2OcrfEtv-haLlHSgXZANHyJLlU',
        accessToken: 'ya29.GlvSBV0rBnphJNMZc2PaszNLBCdh0EOQPzmWcXbcsS1i_3SQkRSFMYYB1ul6eeIg2LTBRIZYDSviqb_WE0nfbUcJSW0Af9Q9cLsYsGbyoCey41K0fY6pywAMFxIb',
        expires: 3600
    }
});