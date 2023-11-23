import multer from "multer";
import path from "path";
import fs from "fs";
const __dirname = path.resolve();
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir);

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(parentDir,"Public", "HotelImages");
    ensureDirectoryExists(destinationPath);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    try {
      const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    } catch (err) {
      cb(err);
    }
  }
});

const storageForRoom = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(parentDir, "Public", "RoomImages");
    ensureDirectoryExists(destinationPath);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    try {
      const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    } catch (err) {
      cb(err);
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Initialize Multer with the storage configuration
export const multerUploadHotelImages = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const multerUploadRoomImages = multer({
  storage: storageForRoom,
  fileFilter: fileFilter,
});
