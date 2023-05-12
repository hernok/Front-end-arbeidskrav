import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id, updatedStand } = req.body;
    const filePath = path.join(process.cwd(), "public", "data.json");
    const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = standsData.findIndex((stand) => stand.id === id);

    if (index > -1) {
      standsData[index] = {
        ...standsData[index],
        ...updatedStand,
      };
      fs.writeFileSync(filePath, JSON.stringify(standsData, null, 2), "utf8");
      res.status(200).json({ message: "Stand updated successfully." });
    } else {
      res.status(404).json({ message: "Stand not found." });
    }
  }
}
