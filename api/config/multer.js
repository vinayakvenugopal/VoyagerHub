import multer from "multer";
import path from "path";
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir);

const storage = multer.diskStorage({

    destination: (req, file, cb) => { cb(null, path.join(parentDir, '/Public/HotelImages')) },
  
    filename: (req, file, cb) => { cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ) }
    
  
  });
  const storageForRoom = multer.diskStorage({

    destination: (req, file, cb) => { cb(null, path.join(parentDir, '/Public/RoomImages')) },
  
    filename: (req, file, cb) => { cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ) }
    
  
  });
  const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {
      
      cb(null, true);
  
    } else {
  
      cb(new Error("Only images are allowed!"), false);
  
    }
  
  };

  // Initialize Multer with the storage configuration
  export const multerUploadHotelImages = multer({ storage: storage,
    fileFilter: fileFilter,
});

export const multerUploadRoomImages = multer({ storage: storageForRoom,
  fileFilter: fileFilter,
})