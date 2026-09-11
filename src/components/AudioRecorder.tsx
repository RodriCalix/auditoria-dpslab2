import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface AudioRecorderProps {
  isRecording: boolean;
  hasAudio: boolean;
  onToggle: () => void;
}

export default function AudioRecorder({ isRecording, hasAudio, onToggle }: AudioRecorderProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.audioButton, 
        isRecording ? styles.audioButtonActive : (hasAudio ? styles.audioButtonRecorded : null)
      ]} 
      onPress={onToggle}
    >
      <MaterialIcons name={isRecording ? "stop" : (hasAudio ? "replay" : "mic")} size={24} color="#FFF" />
      <Text style={styles.btnText}>
        {isRecording ? 'Detener Grabación' : (hasAudio ? 'Grabar de nuevo' : 'Añadir Nota de Voz')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  audioButton: { flexDirection: 'row', backgroundColor: '#007AFF', padding: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  audioButtonActive: { backgroundColor: '#FF3B30' },
  audioButtonRecorded: { backgroundColor: '#FF9500' },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 15, marginLeft: 8 },
});