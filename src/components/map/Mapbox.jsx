import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Mapbox.module.scss";
import Link from "next/link";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = ({ stands }) => {
  const mapContainerRef = useRef(null);
  const defaultCenter = [10.222820907572418, 59.1313665675231];
  const [selectedStand, setSelectedStand] = useState(null);

  const calculateAverageRating = (reviews) => {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className={styles.mapboxglContainer} ref={mapContainerRef}>
      <ReactMapGL
        style={{ height: "80vh", width: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        initialViewState={{
          latitude: defaultCenter[1],
          longitude: defaultCenter[0],
          zoom: 14,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        {stands.map((stand) => (
          <Marker
            key={stand.id}
            longitude={stand.coordinates.lon}
            latitude={stand.coordinates.lat}
            onClick={() => setSelectedStand(stand)}
          />
        ))}
        {selectedStand && (
          <Popup
            latitude={selectedStand.coordinates.lat}
            longitude={selectedStand.coordinates.lon}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedStand(null)}
            anchor="top"
          >
            <div>
              <h3>{selectedStand.stand_name}</h3>
              <p>{selectedStand.description}</p>
              <p>Rating: {calculateAverageRating(selectedStand.reviews)}</p>
              <Link
                className={styles.popupLink}
                href={`/hotdog-stands/${selectedStand.id}`}
              >
                <li className={styles.popupLi}>Visit hotdog stand</li>
              </Link>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
