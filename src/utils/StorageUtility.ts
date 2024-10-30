import { STORAGE_REGION, STORAGE_BUCKET } from "./EnvironmentVariable";
import { S3Client, ListBucketsCommand, ListObjectsCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";

export class StorageUtility {
    private client : S3Client | undefined = undefined;
    public region : string = STORAGE_REGION;
    public bucket : string = STORAGE_BUCKET;

    public async getClient(regional: string = this.region) : Promise<S3Client> {
        if(!this.client) {
            this.client = new S3Client({
                region: regional,
            });
        }
        return this.client;
    }

    public async listBucket() : Promise<any> {
        const params = { };
        const command = new ListBucketsCommand(params);    
        const client = await this.getClient();
        return await client.send(command);
    }

    public async listFile(bucket: string = this.bucket) : Promise<any> {
        const params = {
            Bucket: bucket,
        };
        const command = new ListObjectsCommand(params);    
        const client = await this.getClient();
        return await client.send(command);
    }

    public async uploadFile(file: string | fs.ReadStream, key: string = uuidv4(), bucket: string = this.bucket) : Promise<[string,any]> {
        let stream;
        if(typeof file === 'string') {
            stream = fs.createReadStream(file);
        } else {
            stream = file;
        }
        const params = {
            Bucket: bucket,
            Key: key, 
            Body: stream,       
        };
        const command = new PutObjectCommand(params);    
        const client = await this.getClient();
        let data = await client.send(command);
        return [key,data];
    }

    public async downloadFile(key: string, file?: string | fs.WriteStream, bucket: string = this.bucket) : Promise<any> {
        const params = {
            Bucket: bucket,
            Key: key,        
        };
        const command = new GetObjectCommand (params);    
        const client = await this.getClient();
        const data = await client.send(command);
        if(file) {
            let stream;
            if(typeof file === 'string') {
                stream = fs.createWriteStream(file);
            } else {
                stream = file;
            }
            if(data.Body) {
                (data.Body as any).pipe(stream);
            }
        }
        return data;
    } 
    
    public async deleteFile(key: string, bucket: string = this.bucket) : Promise<any> {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const command = new DeleteObjectCommand(params);    
        const client = await this.getClient();
        return await client.send(command);
    }    

}
