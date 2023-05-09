import React, { useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Mapbox.module.scss";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = ({ stands }) => {
  const mapContainerRef = useRef(null);
  const defaultCenter = [10.222820907572418, 59.1313665675231];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCenter,
      zoom: 14,
    });

    stands.forEach((stand) => {
      new mapboxgl.Marker()
        .setLngLat([stand.coordinates.alt, stand.coordinates.lat])
        .addTo(map);
    });

    return () => map.remove();
  }, [stands]);

  return (
    <div className={styles.mapboxglContainer} ref={mapContainerRef}>
      <ReactMapGL style={{ height: "100vh", width: "100%" }}></ReactMapGL>
    </div>
  );
};

export default Map;
