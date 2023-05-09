import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "public", "data.json");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { standId, review } = req.body;

      const fileData = fs.readFileSync(dataFilePath, "utf8");
      const data = JSON.parse(fileData);

      data[standId].reviews.push(review);

      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

      res.status(200).json({ message: "Review added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error adding review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
