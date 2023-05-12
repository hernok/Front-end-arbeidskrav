import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import cookie from "cookie";
import { useRouter } from "next/router";
import styles from "../styles/create-stand.module.scss";
import Image from "next/image";

const CreateStand = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const [stand, setStand] = useState({
    stand_name: "",
    description: "",
    image: "",
    alt: "",
    coordinates: { lat: "", lon: "" },
  });
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();

      setImages(data.images);
    };

    fetchImages();
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === "lat" || e.target.name === "lon") {
      const value = parseFloat(e.target.value);
      if (value >= -90 && value <= 90) {
        setStand({
          ...stand,
          coordinates: {
            ...stand.coordinates,
            [e.target.name]: value,
          },
        });
      } else {
        console.error("Invalid coordinate value");
      }
    } else {
      setStand({
        ...stand,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/createStand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stand),
      });

      if (!res.ok) throw new Error(res.status);

      alert("Stand created successfully!");

      setStand({
        stand_name: "",
        description: "",
        image: "",
        alt: "",
        coordinates: { lat: "", lon: "" },
      });
    } catch (error) {
      console.error("Error:", error);
    }
    router.push("/create-stand");
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Stand Name:
          <input
            type="text"
            name="stand_name"
            value={stand.stand_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={stand.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Image:
          <select
            name="image"
            value={stand.image}
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
          Image alt text:
          <input
            type="text"
            name="alt"
            value={stand.alt}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Latitude:
          <input
            type="number"
            step="any"
            name="lat"
            value={stand.coordinates.lat}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            step="any"
            name="lon"
            value={stand.coordinates.lon}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Create Stand</button>
      </form>
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

  return {
    props: {},
  };
}

export default CreateStand;
