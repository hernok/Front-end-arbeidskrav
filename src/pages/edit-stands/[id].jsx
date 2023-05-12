import fs from "fs";
import path from "path";
import Navbar from "@/components/navbar/Navbar";
import cookie from "cookie";
import { useState, useEffect } from "react";
import styles from "../styles/edit-stand.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const HotdogStand = ({ stand }) => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [standData, setStandData] = useState({
    stand_name: stand.stand_name,
    description: stand.description,
    image: stand.image,
    alt: stand.alt,
    coordinates: stand.coordinates,
  });
  const averageRating = calculateAverageRating(stand.reviews);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data.images);
    };
    fetchImages();
  }, []);

  function calculateAverageRating(reviews) {
    if (reviews?.length === 0) {
      return "No ratings";
    }
    let total = 0;
    for (let i = 0; i < reviews?.length; i++) {
      total += reviews[i]?.rating;
    }
    return (total / reviews?.length).toFixed(1);
  }

  const handleInputChange = (e) => {
    if (e.target.name === "lat" || e.target.name === "lon") {
      setStandData({
        ...standData,
        coordinates: {
          ...standData.coordinates,
          [e.target.name]: parseFloat(e.target.value),
        },
      });
    } else {
      setStandData({
        ...standData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { id, reviews, ...rest } = standData;
    fetch("/api/editStand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: stand.id,
        updatedStand: rest,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Stand updated successfully.") {
          alert("Stand updated successfully.");
        } else {
          alert("Something went wrong.");
        }
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const emptyStand = {
      id: stand.id,
      stand_name: "",
      description: "",
      image: "",
      alt: "",
      coordinates: { lat: 0, lon: 0 },
      reviews: [],
    };

    fetch("/api/deleteStand", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emptyStand),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        router.push("/edit-stands");
      });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Something went wrong during upload");
      }
      const data = await res.json();
      alert(data.fileName + " was uploaded successfully");
      const imageRes = await fetch("/api/images");
      const imageData = await imageRes.json();
      setImages(imageData.images);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.content}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <h2>Edit hotdog stand</h2>
          <p>Rating: </p>
          {averageRating}

          <label>
            Stand Name:
            <input
              type="text"
              name="stand_name"
              value={standData.stand_name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={standData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Image:
            <select
              name="image"
              value={standData.image}
              onChange={handleInputChange}
              required
            >
              {images.map((image, index) => (
                <option key={index} value={image}>
                  {image}
                </option>
              ))}
            </select>
          </label>
          {stand.image && (
            <div className={styles.imagePreview}>
              <Image
                src={`/assets/images/${stand.image}`}
                alt={stand.alt}
                width={200}
                height={200}
              />
            </div>
          )}
          <label>
            Upload image:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button onClick={handleUpload}>Upload Image</button>
          <label>
            Alt:
            <input
              type="text"
              name="alt"
              value={standData.alt}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Latitude:
            <input
              type="number"
              name="lat"
              value={standData.coordinates.lat}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              name="lon"
              value={standData.coordinates.lon}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Update</button>
        </form>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
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
