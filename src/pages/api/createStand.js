import fs from "fs";
import path from "path";

const handleRequest = async (req, res) => {
  if (req.method === "POST") {
    const newStand = req.body;
    const filePath = path.join(process.cwd(), "public", "data.json");
    const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const maxId = Math.max(...standsData.map((stand) => stand.id));

    newStand.id = maxId + 1;
    newStand.reviews = [];
    standsData.push(newStand);

    fs.writeFileSync(filePath, JSON.stringify(standsData), "utf8");
    res.status(200).json({ message: "Stand added successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handleRequest;
