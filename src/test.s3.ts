import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
    region: 'ap-southeast-1',
});

async function listBucket() {
    console.log("list bucket ...");
    const params = {
    };
    const command = new ListBucketsCommand(params);    
    try {        
        const data = await client.send(command);
        console.info("data:",data);
    } catch(ex) {
        console.error(ex);
    }
}

listBucket();

/*
using environment variables:
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN
AWS_REGION
ex.
set AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
set AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
set AWS_SESSION_TOKEN=AQoEXAMPLEH4aoAH0gNCAPy...truncated...zrkuWJOgQs8IZZaIv2BXIa2R4Olgk
set AWS_REGION=us-west-2
*/