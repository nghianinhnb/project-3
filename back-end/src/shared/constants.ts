import {join} from "path"
import { root } from "../shared/utils"


const constants = {
    PDF_STORAGE_PATH: join(root(), '/storage/pdf'),

    IMAGE_STORAGE_PATH: join(root(), '/storage/image'),

    CERTIFICATE_PATH: join(root(), '/storage/certificate/certificate.p12'),
}


export default constants;
