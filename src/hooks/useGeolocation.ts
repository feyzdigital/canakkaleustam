"use client";

import { useState, useEffect } from "react";
import type { MapCoordinates } from "@/types";
import { CITY_CENTER } from "@/lib/constants";

interface GeolocationState {
  coordinates: MapCoordinates;
  loading: boolean;
  error: string | null;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    coordinates: {
      latitude: CITY_CENTER.latitude,
      longitude: CITY_CENTER.longitude,
    },
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Tarayıcınız konum servislerini desteklemiyor.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = "Konum alınamadı.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Konum izni reddedildi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Konum bilgisi mevcut değil.";
            break;
          case error.TIMEOUT:
            errorMessage = "Konum isteği zaman aşımına uğradı.";
            break;
        }
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 600000,
      }
    );
  }, []);

  return state;
}
