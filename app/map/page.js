"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function MyGoogleMap() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    house: "",
    apartment: "",
    landmark: "",
    saveAs: "",
  });
  const [selectedSaveAs, setSelectedSaveAs] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [locations, setLocations] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(location);
        fetchAddressFromLocation(location);
      },
      (error) => {
        console.error("Error fetching location:", error.message);
        const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
        setCurrentLocation(defaultLocation);
        fetchAddressFromLocation(defaultLocation);
      }
    );
  }, []);

  const fetchAddressFromLocation = async (location) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const { results } = await geocoder.geocode({ location });
      if (results && results[0]) {
        setCurrentAddress(results[0].formatted_address);
      } else {
        setCurrentAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setCurrentAddress("Unable to fetch address");
    }
  };

  const handleMarkerDragEnd = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCurrentLocation(newLocation);
    fetchAddressFromLocation(newLocation);
  };

  const handleSubmit = async () => {
    if (
      !formData.house ||
      !formData.apartment ||
      !formData.landmark ||
      !formData.saveAs
    ) {
      alert("Please fill in all the fields before saving.");
      return;
    }
    try {
      await axios.post("/api/address", formData);
      alert("Address saved successfully");
      setFormData({
        house: "",
        apartment: "",
        landmark: "",
        saveAs: "",
      });
      setSelectedSaveAs("");
    } catch (error) {
      console.error(
        "Error saving address:",
        error.response?.data || error.message
      );
      alert("Failed to save address. Please try again.");
    }
  };

  const handleSaveAs = (value) => {
    setFormData((prev) => ({ ...prev, saveAs: value }));
    setSelectedSaveAs(value);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleOnPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCurrentLocation(location);
      fetchAddressFromLocation(location);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("/api/address");
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="p-8 bg-gray-50 flex flex-wrap gap-8">
      <div className="max-w-4xl w-full lg:w-2/3 mx-auto">
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handleOnPlacesChanged}
          >
            <div className="relative flex items-center mb-6">
              <input
                type="text"
                placeholder="Enter Address"
                className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="absolute right-4 w-6 h-6 text-gray-500 pointer-events-none"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
          </StandaloneSearchBox>
        )}

        {isLoaded && currentLocation && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={15}
            className="rounded-xl shadow-lg mb-8"
          >
            <Marker
              position={currentLocation}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          </GoogleMap>
        )}

        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">📍 Current Location</h2>
          <p className="bg-gray-100 p-2 rounded-md text-gray-800 mb-3">
            {currentAddress}
          </p>

          <div className="space-y-2">
            {["house", "apartment", "landmark"].map((field, idx) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {
                    [
                      "HOUSE / FLAT / BLOCK NO.",
                      "APARTMENT / ROAD / AREA",
                      "Landmark",
                    ][idx]
                  }
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">SAVE AS</p>
            <div className="flex space-x-6">
              {["home", "office", "contact", "location"].map((label) => (
                <button
                  key={label}
                  onClick={() => handleSaveAs(label)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full shadow-md hover:bg-purple-200 transition-transform transform hover:scale-110 ${
                    selectedSaveAs === label ? "bg-purple-400" : "bg-purple-100"
                  }`}
                >
                  {label === "home" && "🏠"}
                  {label === "office" && "💼"}
                  {label === "contact" && "👥"}
                  {label === "location" && "📍"}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            Save Address
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow-lg">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Saved Location
          </h2>
          <ul className="space-y-4">
            {locations.map((loc, idx) => (
              <li
                key={idx}
                className="flex items-start hover:bg-gray-200 rounded-md p-1"
              >
                <span className="text-xl mr-4">
                  {loc.saveAs === "home" && "🏠"}
                  {loc.saveAs === "office" && "💼"}
                  {loc.saveAs === "contact" && "👥"}
                  {loc.saveAs === "location" && "📍"}
                </span>
                <div>
                  <h3 className="font-bold capitalize">{loc.saveAs}</h3>
                  <p className="text-sm text-gray-600">
                    {`${loc.house}, ${loc.apartment}, ${loc.landmark}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
