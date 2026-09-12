import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from 'expo-router';

function AudioPlayerView({ url }: { url: string }) {
  const player = useAudioPlayer(url);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  return (
    <TouchableOpacity style={styles.audioPlayer} onPress={handlePlayPause}>
      <MaterialIcons name={isPlaying ? "pause-circle-filled" : "play-circle-filled"} size={28} color="#007AFF" />
      <View style={styles.audioInfo}>
        <Text style={styles.audioTitle}>Nota de voz adjunta</Text>
        <Text style={styles.audioDuration}>{isPlaying ? 'Reproduciendo...' : 'Toca para escuchar'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function AuditLogItem({ item }: { item: any }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const isOk = item.actionType === 'AUDIT_CHECK';
  const time = new Date(item.timestamp).toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' });
  const day = new Date(item.timestamp).toLocaleDateString('es-SV', { day: 'numeric', month: 'short' });

  const goToMap = () => {
    // Enviamos las coordenadas a la pestaña del mapa
    router.push({ pathname: '/map', params: { lat: item.location.latitude, lng: item.location.longitude } });
  };

  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineIndicator}>
        <View style={[styles.dot, isOk ? styles.dotOk : styles.dotIncidence]} />
        <View style={styles.line} />
      </View>
      
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setExpanded(!expanded)}>
        <View style={styles.cardHeader}>
          <Text style={styles.timestamp}>{day} • {time}</Text>
          <View style={[styles.badge, isOk ? styles.badgeOk : styles.badgeIncidence]}>
            <Text style={[styles.badgeText, isOk ? styles.badgeTextOk : styles.badgeTextIncidence]}>
              {isOk ? 'STOCK EXACTO' : 'INCIDENCIA'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.productTitle} numberOfLines={1}>{item.productTitle}</Text>
        
        <View style={styles.expandHint}>
          <Text style={styles.expandText}>{expanded ? 'Ocultar detalles' : 'Tocar para ver detalles'}</Text>
          <MaterialIcons name={expanded ? "expand-less" : "expand-more"} size={16} color="#8898AA" />
        </View>

        {expanded && (
          <View style={styles.expandedContent}>
            {item.observationText && (
              <View style={styles.observationBox}>
                <Text style={styles.observationTitle}>Observación:</Text>
                <Text style={styles.observationText}>{item.observationText}</Text>
              </View>
            )}

            {}
            <TouchableOpacity style={styles.locationRow} onPress={goToMap}>
              <MaterialIcons name="map" size={18} color="#007AFF" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.locationText}>Ver ubicación exacta en el mapa</Text>
                <Text style={styles.locationCoords}>Lat: {item.location.latitude.toFixed(5)} | Lng: {item.location.longitude.toFixed(5)}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#007AFF" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>

            {item.audioNoteUrl && <AudioPlayerView url={item.audioNoteUrl} />}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  timelineRow: { flexDirection: 'row', marginBottom: 16 },
  timelineIndicator: { width: 30, alignItems: 'center', marginRight: 8 },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: 4, zIndex: 2 },
  dotOk: { backgroundColor: '#00C853', borderWidth: 3, borderColor: '#E8F5E9' },
  dotIncidence: { backgroundColor: '#FF9500', borderWidth: 3, borderColor: '#FFF3E0' },
  line: { width: 2, flex: 1, backgroundColor: '#DFE3E8', marginTop: -10, zIndex: 1 },
  card: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 16, shadowColor: '#0A2540', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  timestamp: { fontSize: 13, color: '#637A92', fontWeight: '600' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeOk: { backgroundColor: '#E8F5E9' },
  badgeIncidence: { backgroundColor: '#FFF3E0' },
  badgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  badgeTextOk: { color: '#00C853' },
  badgeTextIncidence: { color: '#FF9500' },
  productTitle: { fontSize: 18, fontWeight: '700', color: '#0A2540', marginBottom: 8 },
  expandHint: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  expandText: { fontSize: 12, color: '#8898AA', marginRight: 4 },
  expandedContent: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F0F4F8' },
  observationBox: { backgroundColor: '#FFF3E0', padding: 12, borderRadius: 8, marginBottom: 12 },
  observationTitle: { fontSize: 12, fontWeight: '700', color: '#E65100', marginBottom: 4 },
  observationText: { fontSize: 14, color: '#0A2540' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8 },
  locationText: { fontSize: 14, color: '#007AFF', fontWeight: '700' },
  locationCoords: { fontSize: 11, color: '#637A92', marginTop: 2 },
  audioPlayer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F4F8', padding: 12, borderRadius: 12 },
  audioInfo: { marginLeft: 12 },
  audioTitle: { fontSize: 14, fontWeight: '700', color: '#0A2540' },
  audioDuration: { fontSize: 12, color: '#637A92' },
});