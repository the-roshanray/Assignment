"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [address, setAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLocationPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationClick = () => {
    setShowLocationPopup(true);
  };
  const closePopup = () => {
    setShowLocationPopup(false);
  };
  const handleManualSearch = () => {
    router.push("/map");
  };

  const handleShareLocation = async () => {
    setIsFetchingLocation(true);

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch address.");
              }
              const data = await response.json();
              setAddress(data.display_name);
              alert(`Location: ${data.display_name}`);
            } catch (error) {
              alert("Error fetching address: " + error.message);
            } finally {
              setIsFetchingLocation(false);
            }
          },
          (error) => {
            alert("Error fetching location: " + error.message);
            setIsFetchingLocation(false);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        setIsFetchingLocation(false);
      }
    } catch (error) {
      alert("Unexpected error: " + error.message);
      setIsFetchingLocation(false);
    }
  };

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-6 h-6 text-white"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M256 0c17.7 0 32 14.3 32 32v34.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-34.7C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-34.7C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h34.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
            </svg>
          </div>
          <div>
            <h1
              className="font-semibold text-orange-500 flex items-center cursor-pointer"
              onClick={handleLocationClick}
            >
              {address ? `Delivery to ${address}` : "Add your location"}
              <svg
                className="w-3 h-3 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </h1>
            <p className="text-sm text-gray-200">
              {address || "To see items in your area"}
            </p>
          </div>
        </div>

        <div className="bg-white p-2 rounded-full" aria-label="Profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 text-white"
            aria-hidden="true"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-center mt-3 ">
        <form className="flex items-center w-full max-w-2xl bg-white rounded-full overflow-hidden shadow-md">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder='Search for "Perfumes"'
            className="flex-grow px-4 py-2 outline-none text-gray-700"
            aria-label="Search"
          />
          <button
            type="submit"
            className="px-4 text-gray-500 hover:text-gray-700"
            aria-label="Search Button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-6 h-6"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </form>
      </div>

      {showLocationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover: bg-gray-200 rounded-full p-1"
              aria-label="Close popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-6 h-6"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6 mt-6 text-gray-900">
                Share your location to find the closest store
              </h2>
              <button
                className="bg-orange-500 text-white py-3 px-6 rounded-full mb-4 flex items-center justify-center space-x-3 hover:bg-orange-600 transition-all font-bold shadow-lg hover:shadow-xl focus:outline-none"
                onClick={handleShareLocation}
                disabled={isFetchingLocation} // Optionally disable the button while fetching
              >
                {isFetchingLocation ? (
                  <span className="animate-pulse">Fetching...</span>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-6 h-6 text-white transition-all duration-300"
                    >
                      <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
                    </svg>
                    <span>Share Location</span>
                  </>
                )}
              </button>

              <div className="relative mb-4">
                <button
                  onClick={handleManualSearch}
                  type="text"
                  className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Search Your Location Manually
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="absolute top-3 right-4 w-6 h-6 text-gray-400"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>

              <p className="text-sm text-gray-600">
                <span>or</span>{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Login to see your saved addresses
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
