"use server";
import { sqs } from "@/lib/sqs";
import { ReceiveMessageCommand, SendMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

interface sqsSendMessageState {
    errors: {
        root?: string[];
    },
    success?: {
        isSuccess: boolean;
        message: string[];
        url?: string;
    }
}

export async function sqsSendReceiveMessage(url: string, userId: string): Promise<sqsSendMessageState> {
    "use server";
    try {
        if (!process.env.SQS_QUEUE_URL || !process.env.SQS_RECEIVE_URL) {
            return {
                errors: {
                    root: ["Internal Server Error"]
                }
            };
        }

        const command = new SendMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: "String",
                    StringValue: "p",
                },
                Author: {
                    DataType: "String",
                    StringValue: "Tatsuya",
                },
                WeeksOn: {
                    DataType: "Number",
                    StringValue: "6",
                },
                URL: {
                    DataType: "String",
                    StringValue: `${url}`,
                },
            },
            MessageBody: "Send the message from the local place to sqs!!"
        });
        await sqs.send(command);

        // TODO: receive message from sqs to get the url of the image store in S3 bucket B
        // TODO: create another SQS to send the response from the lambda function in case if there are loop by sending the sqs, which is used for triggering lambda.
        const receiveCommand = new ReceiveMessageCommand({
            QueueUrl: process.env.SQS_RECEIVE_URL,
            AttributeNames: ["All"],
            MessageAttributeNames: ["All"],
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 20,
        });

        const {Messages} = await sqs.send(receiveCommand);

        if (!Messages || Messages.length == 0) {
            return {
                errors: {
                    root: ["No response from Lambda. Transfering the image data from the temp S3 bucket to the another S3 bucket."]
                },
                success: {
                    isSuccess: false,
                    message: ["Internal Server Error"],
                }
            };
        }

        const message = Messages[0];
        const messageBody = message.Body;
        const parsedBody = JSON.parse(messageBody!);
        const {url: newUrl} = parsedBody;

        if (newUrl && message.ReceiptHandle) {
            const deleteCommand = new DeleteMessageCommand({
                QueueUrl: process.env.SQS_RECEIVE_URL,
                ReceiptHandle: message.ReceiptHandle
            });

            await sqs.send(deleteCommand);
        }

        return {
            errors: {},
            success: {
                isSuccess: true,
                message: ["Successfully completed the process!"],
                url: newUrl,
            }
        };

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    root: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    root: ["Something wrong"]
                }
            };
        }
    }
}