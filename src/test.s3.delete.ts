import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
    region: 'ap-southeast-1',
});

async function deleteFile(bucket: string) {
    console.log("delete file ...");
    const params = {
        Bucket: bucket,
        Key: "test-upload-file",        
    };
    const command = new DeleteObjectCommand(params);    
    try {        
        const data = await client.send(command);
        console.info("data:",data);
    } catch(ex) {
        console.error(ex);
    }
}

let bucket = "mdc-soc-dev";
const args = process.argv.slice(2);
if(args.length > 0) bucket = args[0];
deleteFile(bucket);

