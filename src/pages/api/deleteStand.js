import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.body;
    const filePath = path.join(process.cwd(), "public", "data.json");
    const fileData = fs.readFileSync(filePath);
    const standIndex = stands.findIndex((stand) => stand.id === id);
    let stands = JSON.parse(fileData);
    if (standIndex === -1) {
      res.status(404).json({ message: "Stand not found" });
    } else {
      stands[standIndex] = {
        id: id,
        stand_name: "",
        description: "",
        image: "",
        alt: "",
        coordinates: {
          lat: 0,
          lon: 0,
        },
        reviews: [],
      };
      fs.writeFileSync(filePath, JSON.stringify(stands));
      res.status(200).json({ message: "Stand deleted successfully" });
    }
  } else {
    res.status(400).json({ message: "Only PUT requests are allowed" });
  }
}
