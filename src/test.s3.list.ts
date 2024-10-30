import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
    region: 'ap-southeast-1',
});

async function listObject(bucket:string) {
    console.log("list object ...");
    const params = {
        Bucket: bucket,
    };
    const command = new ListObjectsCommand(params);    
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
listObject(bucket);
