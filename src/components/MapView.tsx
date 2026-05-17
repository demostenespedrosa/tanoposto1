"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Station } from '@/hooks/useStations'
import { Card, CardContent } from '@/components/ui/card'
import { Fuel, MapPin, ChevronRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MapViewProps {
  stations: Station[]
  userLocation: { latitude: number; longitude: number } | null
  fuelId: string
  onSelectStation: (id: string) => void
}

const priceIcon = (price: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="bg-primary text-white font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white text-xs whitespace-nowrap min-w-[50px] text-center">R$ ${price}</div>`,
  iconSize: [60, 30],
  iconAnchor: [30, 30]
});

export default function MapView({ stations, userLocation, fuelId, onSelectStation }: MapViewProps) {
  const center = userLocation ? [userLocation.latitude, userLocation.longitude] as [number, number] : [-8.28, -35.03] as [number, number]

  return (
    <div className="h-[calc(100vh-250px)] w-full rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-200">
      <MapContainer 
        center={center} 
        zoom={14} 
        scrollWheelZoom={true} 
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={L.divIcon({
            className: '',
            html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>'
          })}>
            <Popup>Você está aqui</Popup>
          </Marker>
        )}

        {stations.map(station => {
          const price = (station.prices as any)?.[fuelId]?.app || (station.prices as any)?.[fuelId]?.discount || "---"
          
          return (
            <Marker 
              key={station.id} 
              position={[Number(station.latitude), Number(station.longitude)]}
              icon={priceIcon(Number(price).toFixed(2))}
              eventHandlers={{
                click: () => onSelectStation(station.id)
              }}
            >
              <Popup className="station-popup">
                <div className="p-1 w-40">
                  <p className="font-bold text-slate-800 text-xs truncate">{station.name}</p>
                  <p className="text-[10px] text-primary font-bold">R$ {Number(price).toFixed(2)}</p>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
