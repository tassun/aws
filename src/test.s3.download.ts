import { S3Client, GetObjectCommand   } from '@aws-sdk/client-s3';
import fs from "fs";

const client = new S3Client({
    region: 'ap-southeast-1',
});

async function downloadFile(bucket: string, file: string) {
    console.log("download file ...");
    const params = {
        Bucket: bucket,
        Key: "test-upload-file",        
    };
    const command = new GetObjectCommand (params);    
    try {        
        const data = await client.send(command);
        console.info("data:",data);
        const file = fs.createWriteStream("test_download_file.txt");
        if(data.Body) {
            (data.Body as any).pipe(file);
        }
    } catch(ex) {
        console.error(ex);
    }
}

let bucket = "mdc-soc-dev";
let filename = "./test.s3.ts";
const args = process.argv.slice(2);
if(args.length > 0) bucket = args[0];
if(args.length > 1) filename = args[1];
downloadFile(bucket,filename);

