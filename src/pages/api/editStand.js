import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    // Get data from request body
    const { id, updatedStand } = req.body;

    // Read current stands data
    const filePath = path.join(process.cwd(), "public", "data.json");
    const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Find the stand with the provided id and update it
    const index = standsData.findIndex((stand) => stand.id === id);
    if (index > -1) {
      standsData[index] = updatedStand;

      // Write the updated stands data back to the file
      fs.writeFileSync(filePath, JSON.stringify(standsData, null, 2), "utf8");

      res.status(200).json({ message: "Stand updated successfully." });
    } else {
      res.status(404).json({ message: "Stand not found." });
    }
  }

  if (req.method === "DELETE") {
    // Get id from request body
    const { id } = req.body;

    // Read current stands data
    const filePath = path.join(process.cwd(), "public", "data.json");
    const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Filter out the stand with the provided id
    const updatedStandsData = standsData.filter((stand) => stand.id !== id);

    // Write the updated stands data back to the file
    fs.writeFileSync(
      filePath,
      JSON.stringify(updatedStandsData, null, 2),
      "utf8"
    );

    res.status(200).json({ message: "Stand deleted successfully." });
  }
}
