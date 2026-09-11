import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';

interface LocationMapProps {
  logs: any[];
  hasPermission: boolean;
}

export default function LocationMap({ logs, hasPermission }: LocationMapProps) {
  const { lat, lng } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 13.6929,
    longitude: -89.2182,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    if (lat && lng && mapRef.current) {
      // Vuelo de cámara suave hacia el pin seleccionado
      mapRef.current.animateToRegion({
        latitude: parseFloat(lat as string),
        longitude: parseFloat(lng as string),
        latitudeDelta: 0.002, // Nivel de zoom cercano
        longitudeDelta: 0.002,
      }, 1500); 
    }
  }, [lat, lng]);

  return (
    <MapView 
      ref={mapRef}
      style={StyleSheet.absoluteFill} 
      initialRegion={initialRegion}
      provider={PROVIDER_DEFAULT}
      showsUserLocation={hasPermission}
      showsMyLocationButton={hasPermission}
    >
      {logs.map((log) => (
        <Marker
          key={log.id}
          coordinate={{ latitude: log.location.latitude, longitude: log.location.longitude }}
          title={log.productTitle}
          description={log.actionType === 'INCIDENCE' ? '⚠️ Incidencia reportada' : '✔️ Stock correcto'}
          pinColor={log.actionType === 'INCIDENCE' ? '#FF9500' : '#00C853'}
        />
      ))}
    </MapView>
  );
}