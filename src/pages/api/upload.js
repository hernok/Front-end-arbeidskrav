import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import path from "path";

// Setup Multer storage
const storage = multer.diskStorage({
  destination: "./public/assets/images",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file");

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js's body parser as Multer will handle it
  },
};

export default async function uploadImage(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the file name (in real-world scenarios, you might return a URL to the uploaded file)
    res.status(200).json({ fileName: req.file.filename });
  });
}
