import { S3Client, PutObjectCommand  } from '@aws-sdk/client-s3';
import fs from "fs";

const client = new S3Client({
    region: 'ap-southeast-1',
});

async function uploadFile(bucket: string, file: string) {
    console.log("upload file ...");
    const stream = fs.createReadStream(file);
    const params = {
        Bucket: bucket,
        Key: "test-upload-file", 
        Body: stream,       
    };
    const command = new PutObjectCommand(params);    
    try {        
        const data = await client.send(command);
        console.info("data:",data);
    } catch(ex) {
        console.error(ex);
    }
}

let bucket = "mdc-soc-dev";
let filename = "./src/test.s3.ts";
const args = process.argv.slice(2);
if(args.length > 0) bucket = args[0];
if(args.length > 1) filename = args[1];
uploadFile(bucket,filename);

