/**
 * TypeScript type definitions for the aws-lambda-functions module.
 * @author Andrew Jarombek
 * @since 11/21/2020
 */

declare function send(
    subject: string,
    to?: string,
    attachments?: any[],
    htmlFilename?: string,
    cssFilename?: string,
    replacementValues?: object
): void;