import { fileURLToPath } from 'url';
import path from 'path'
import multer from 'multer';
import { checkFileExec } from '../utils/checkFileExec.js';

/* const storage = (dest) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return multer.diskStorage({
        destination: path.join(__dirname, '..', '..', '..', 'public', dest),
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    })
}

const upload = multer({
    storage: storage('forum'),
    fileFilter: (req, file, callback) => checkFileExec(file, callback),
    limits: { fields: 10, fileSize: 1048576 * 20 } // 20Mb
}).array('attach', 4) // 20 * 4 = 80Mb

export { storage, upload }; */

// SET CUSTOM NAME (ex: attach_1703689049071)
const storage = (dest, name) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return multer.diskStorage({
        destination: path.join(__dirname, '..', '..', '..', 'public', dest),
        filename: (req, file, callback) => {
            callback(null, name + '_' + Date.now() + path.extname(file.originalname))
        }
    })
}

const upload = multer({
    storage: storage('forum', 'attach'),
    fileFilter: (req, file, callback) => checkFileExec(file, callback),
    limits: { fields: 10, fileSize: 1048576 * 20 } // 20Mb
}).array('attach', 4) // 20 * 4 = 80Mb

export { storage, upload };
