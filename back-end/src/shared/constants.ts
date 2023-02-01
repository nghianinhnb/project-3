import {join} from "path"
import { root } from "../shared/utils"


const constants = {
    TEMPLATE_STORAGE_PATH: join(root(), '/src/public/template'),

    PDF_STORAGE_PATH: join(root(), '/src/public/pdf'),

    IMAGE_STORAGE_PATH: join(root(), '/storage/image'),

    CERTIFICATE_PATH: join(root(), '/storage/certificate/certificate.p12'),

    LOG_PATH: join(root(), '/storage/logs'),

    LOG_FILE_NAME: 'project3.log',
}


export default constants;
