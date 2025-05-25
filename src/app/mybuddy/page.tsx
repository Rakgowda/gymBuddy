"use client";

import { useEffect, useState } from "react";

export default function MyBuddyPage() {
  const [location, setLocation] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
        },
        () => {
          setError("Location access denied or unavailable");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (coords) {
      // Use OpenStreetMap Nominatim API for reverse geocoding
      const fetchLocationName = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}&accept-language=en`
          );
          if (!response.ok) throw new Error("Failed to fetch location name");
          const data = await response.json();
          const address = data.address;
          // Compose a human-readable location string
          const name =
            address.city || address.town || address.village || address.hamlet || address.suburb || "";
          const state = address.state || address.region || "";
          const country = address.country || "";
          const display = [name, state, country].filter(Boolean).join(", ");
          setLocation(display || data.display_name || `${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`);
        } catch {
          setLocation(`${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`);
        }
      };
      fetchLocationName();
    }
  }, [coords]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 relative">
      {/* Location display */}
      <div className="fixed top-4 right-8 z-50 bg-gray-800 bg-opacity-80 px-4 py-2 rounded-lg shadow-lg text-sm">
        {location && <span>📍 {location}</span>}
        {error && <span className="text-red-400">{error}</span>}
        {!location && !error && <span>Detecting location...</span>}
      </div>
      <div className="max-w-4xl mx-auto mt-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          My Buddy
        </h1>
        {/* Add more content here as needed */}
      </div>
    </main>
  );
} 