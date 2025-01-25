"use server";

interface imagePreUrlCreateProps {
    image: File;
}

interface ImagePreUrlCreateState {
    errors: { _form?: string };
    success?: {
        isSuccess: boolean;
        message: string;
        presignedUrl: string;
    }
}

export async function imagePreUrlCreate({ image }: imagePreUrlCreateProps): Promise<ImagePreUrlCreateState> {
    // TODO: create presigned url
    // TODO: once hit the save or applied button, move its object from the tmp s3 to permanent s3 bucket with sqs and lambda, and url should be same as the object.
    return {
        errors: {},
        success: {
            isSuccess: true, message: "Success", presignedUrl: `url`
        }
    }
}