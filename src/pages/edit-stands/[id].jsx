import fs from "fs";
import path from "path";
import Navbar from "@/components/navbar/Navbar";
import cookie from "cookie";
import { useState } from "react";

const HotdogStand = ({ stand }) => {
  const [standName, setStandName] = useState(stand.stand_name);
  const [description, setDescription] = useState(stand.description);
  const [image, setImage] = useState(stand.image);
  const [alt, setAlt] = useState(stand.alt);

  const averageRating = calculateAverageRating(stand.reviews);

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
      return "No ratings";
    }
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    return (total / reviews.length).toFixed(1);
  }
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch("/api/editStand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: stand.id,
        updatedStand: {
          ...stand,
          stand_name: standName,
          description: description,
          image: image,
          alt: alt,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleDelete = () => {
    fetch("/api/editStand", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: stand.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleUpdate}>
        <label>
          Stand Name:
          <input
            type="text"
            value={standName}
            onChange={(e) => setStandName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <label>
          Alt:
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)
    : {};
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  if (!user || user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const id = context.params.id;
  const filePath = path.join(process.cwd(), "public", "data.json");
  const standsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return {
    props: {
      stand: standsData[id],
    },
  };
}

export default HotdogStand;
