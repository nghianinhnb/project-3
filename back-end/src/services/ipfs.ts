import fs from 'fs'
import { ThirdwebStorage } from "@thirdweb-dev/storage"


const storage = new ThirdwebStorage();


export async function uploadToIpfs(filePath: string) {
    return await storage.upload(fs.readFileSync(filePath));
}
