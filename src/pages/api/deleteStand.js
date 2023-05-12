import fs from "fs";
import path from "path";

const handler = (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;
    const filePath = path.join(process.cwd(), "public", "data.json");
    const fileData = fs.readFileSync(filePath);
    let stands = JSON.parse(fileData);
    const standIndex = stands.findIndex((stand) => stand.id === id);
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
};
export default handler;
