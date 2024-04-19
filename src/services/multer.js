import multer from "multer";
import { nanoid } from "nanoid";

 export const fileValid={
    image:['image/jpeg','image/png','image/jpg'],
    file:['application/pdf']
}
const uploadFile = (customValidation=[]) => {
    const storage = multer.diskStorage({});

    const fileFilter = (req, file, cb) => {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid format"), false);
        }
    };

    const upload = multer({ storage, fileFilter });
    return upload;
};

export default uploadFile;
