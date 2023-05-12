import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(), "public/assets/images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Filter out any non-image files (this assumes images have .jpg, .png, .gif or .svg extension)
    const imageFiles = files.filter((file) =>
      [".jpg", ".png", ".gif", ".svg"].includes(path.extname(file))
    );

    res.status(200).json({ images: imageFiles });
  });
}
