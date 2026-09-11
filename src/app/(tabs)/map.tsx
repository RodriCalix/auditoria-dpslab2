import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppSelector } from '../../context/redux/hooks';
import LocationMap from '../../components/LocationMap';

export default function MapScreen() {
  const logs = useAppSelector((state) => state.audit.logs);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setHasLocationPermission(status === 'granted');
      } catch (e) {
        console.warn('Error solicitando permisos:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0A2540" />
        <Text style={styles.loadingText}>Cargando mapa satelital...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LocationMap logs={logs} hasPermission={hasLocationPermission} />

      <View style={styles.floatingHeader}>
        <View style={styles.headerContent}>
          <View style={styles.iconBox}>
            <MaterialIcons name="satellite-alt" size={24} color="#007AFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Rastreo GPS Activo</Text>
            <Text style={styles.headerSubtitle}>{logs.length} auditorías geolocalizadas</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.bottomTitle}>Puntos de Control</Text>
        <Text style={styles.bottomText}>
          Los pines verdes indican verificaciones sin novedad; los naranjas marcan incidencias de inventario con coordenadas exactas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#637A92', fontWeight: '600' },
  floatingHeader: { position: 'absolute', top: 50, left: 16, right: 16, backgroundColor: '#FFF', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { backgroundColor: '#E3F2FD', padding: 12, borderRadius: 12, marginRight: 16 },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0A2540' },
  headerSubtitle: { fontSize: 13, color: '#637A92', marginTop: 2 },
  bottomCard: { position: 'absolute', bottom: 30, left: 16, right: 16, backgroundColor: '#FFF', borderRadius: 20, padding: 20, shadowColor: '#0A2540', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 10 },
  bottomTitle: { fontSize: 16, fontWeight: '700', color: '#0A2540', marginBottom: 6 },
  bottomText: { fontSize: 13, color: '#637A92', lineHeight: 18 },
});