"use client";

import Form from "@/components/Form";
import LocationSearch from "@/components/LocationSearch";
import MapDisplay from "@/components/MapDisplay";
import WeatherInfo from "@/components/WeatherInfo";
import { Position } from "@/utils/common.types";
import { useState } from "react";

export default function Home() {
  const [position, setPosition] = useState<Position>({
    lat: 51.505,
    lng: -0.09,
  });

  return (
    <main className="w-full h-[200px] px-6 lg:px-24 py-12">
      <h1 className="w-full text-3xl text-center font-bold mb-10">
        Weather App
      </h1>

      <LocationSearch setPosition={setPosition} />

      <div className="w-full flex flex-col lg:flex-row justify-between items-center">
        <Form position={position} setPosition={setPosition} />
        <MapDisplay zoom={13} setPosition={setPosition} position={position} />
      </div>

      <WeatherInfo position={position} />
    </main>
  );
}
