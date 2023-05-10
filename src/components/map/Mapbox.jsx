import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Mapbox.module.scss";
import { useRouter } from "next/router";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = ({ stands }) => {
  const mapContainerRef = useRef(null);
  const defaultCenter = [10.222820907572418, 59.1313665675231];
  const [popupInfo, setPopupInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCenter,
      zoom: 14,
    });

    stands.forEach((stand) => {
      const averageRating = calculateAverageRating(stand.reviews);
      function calculateAverageRating(reviews) {
        let total = 0;
        for (let i = 0; i < reviews.length; i++) {
          total += reviews[i].rating;
        }
        return (total / reviews.length).toFixed(1);
      }
      new mapboxgl.Marker()
        .setLngLat([stand.coordinates.alt, stand.coordinates.lat])
        .addTo(map)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>" +
              stand.stand_name +
              "</h3><p>" +
              stand.description +
              "</p>" +
              "<p>" +
              "Rating:" +
              " " +
              averageRating +
              "</p>" +
              "<Link href={" +
              `/hotdog-stands/${stand.id}` +
              "}>" +
              "<p>Visit hotdog stand</p>" +
              "</Link>"
          )
        );
    });

    return () => map.remove();
  }, [stands]);

  const redirectToStand = (id) => {
    router.push(`/hotdog-stands/${id}`);
  };

  return (
    <div className={styles.mapboxglContainer} ref={mapContainerRef}>
      <ReactMapGL style={{ height: "100vh", width: "100%" }}>
        {stands.map((stand) => (
          <Marker
            key={stand.id}
            longitude={stand.coordinates.alt}
            latitude={stand.coordinates.lat}
            onClick={() => redirectToStand(stand.id)}
          >
            {popupInfo && (
              <Popup
                latitude={popupInfo.coordinates.lat}
                longitude={popupInfo.coordinates.alt}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div>
                  <h3>{popupInfo.stand_name}</h3>
                  <p>{popupInfo.description}</p>
                  <p>Rating: {averageRating}</p>
                  <Link href={`/hotdog-stands/${stand.id}`}>
                    <p>Visit hotdog stand</p>
                  </Link>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
