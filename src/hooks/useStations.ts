
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

/**
 * Interface para os dados do posto no Firestore
 */
export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: "ativo" | "inativo";
  logo?: string;
  prices: {
    [fuelId: string]: {
      pump: number;
      app: number;
    }
  };
  services: string[];
  hours?: string;
  createdAt?: any;
  updatedAt?: any;
  // Campo calculado localmente
  dist?: number;
}

/**
 * Calcula a distância entre dois pontos usando a fórmula de Haversine em KM
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

/**
 * Hook para obter a localização em tempo real do dispositivo
 */
export function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não suportada"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
}
