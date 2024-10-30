import { StorageUtility } from "./utils/StorageUtility";

async function test() {
    let util = new StorageUtility();
    let buckets = await util.listBucket();
    console.log("listBucket:",buckets);

    let files = await util.listFile();
    console.log("listFile:",files);

    let [key,uploadres] = await util.uploadFile("./src/test.s3.ts");
    console.log("uploadFile:",uploadres);

    let downloadres = await util.downloadFile(key,"test_download_file.txt");
    console.log("downloadFile:",downloadres);

    let deleteres = await util.deleteFile(key);
    console.log("deleteFile:",deleteres);

}

test();
