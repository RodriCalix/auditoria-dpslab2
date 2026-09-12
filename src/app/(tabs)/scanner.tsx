import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useAudioRecorder, RecordingPresets, AudioModule } from 'expo-audio';
import { MaterialIcons } from '@expo/vector-icons';

import { useRouter, usePathname } from 'expo-router'; 

import { CATALOG } from '../../data/products';
import { Product } from '../../types/Product';
import { useAppDispatch } from '../../context/redux/hooks';
import { addAuditEntry } from '../../context/redux/auditSlice';
import CameraScanner from '../../components/CameraScanner';
import AudioRecorder from '../../components/AudioRecorder';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [showIncidenceForm, setShowIncidenceForm] = useState(false);
  const [observation, setObservation] = useState('');
  
  const [isRecordingUI, setIsRecordingUI] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  
  const pathname = usePathname();
  const isFocused = pathname === '/scanner';

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <MaterialIcons name="camera-alt" size={64} color="#0A2540" />
        <Text style={styles.permissionText}>Habilita la cámara para auditar</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.primaryButtonText}>Dar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scannedProduct || isProcessing) return;
    const product = CATALOG.find((p) => p.barcode === data);
    if (product) {
      setScannedProduct(product);
      setShowIncidenceForm(false);
      setObservation('');
      setIsRecordingUI(false);
      setHasAudio(false);
    } else {
      Alert.alert('Error', `Código ${data} no registrado.`);
    }
  };

  const toggleRecording = async () => {
    if (!isRecordingUI) {
      const { granted } = await AudioModule.requestRecordingPermissionsAsync();
      if (!granted) return Alert.alert('Error', 'Micrófono denegado');
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsRecordingUI(true);
      setHasAudio(false);
    } else {
      await recorder.stop();
      setIsRecordingUI(false);
      setHasAudio(true);
    }
  };

  const handleCancel = async () => {
    if (isRecordingUI) await recorder.stop();
    setScannedProduct(null);
    setShowIncidenceForm(false);
    setObservation('');
    setIsRecordingUI(false);
    setHasAudio(false);
  };

  const saveAudit = async (type: 'AUDIT_CHECK' | 'INCIDENCE') => {
    if (!scannedProduct) return;
    setIsProcessing(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('GPS denegado');
      
      let location = await Location.getLastKnownPositionAsync({});
      if (!location) {
         location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
      }
      
      if (isRecordingUI) await recorder.stop();
      
      const finalAudioUrl = (type === 'INCIDENCE' && hasAudio) ? (recorder.uri || undefined) : undefined;
      const finalObs = (type === 'INCIDENCE' && observation.trim().length > 0) ? observation.trim() : undefined;
      
const randomAngle = Math.random() * 2 * Math.PI;
const offset = 0.0003;

dispatch(addAuditEntry({
  id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // ID 100% irrepetible
  productId: scannedProduct.id,
  productTitle: scannedProduct.title,
  timestamp: new Date().toISOString(),
  actionType: type,
  observationText: finalObs,
  audioNoteUrl: finalAudioUrl,
  location: { 
    latitude: location.coords.latitude + (Math.sin(randomAngle) * offset), 
    longitude: location.coords.longitude + (Math.cos(randomAngle) * offset) 
  }
}));

      Alert.alert('Guardado', 'Auditoría registrada exitosamente.');
      setScannedProduct(null);
      setShowIncidenceForm(false);
      setObservation('');
      setIsRecordingUI(false);
      setHasAudio(false);
      router.push('/audit-log');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraScanner isActive={!scannedProduct} onBarcodeScanned={handleBarcodeScanned} />
      )}
      
      {scannedProduct && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.actionCard}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Auditar Producto</Text>
            <Text style={styles.productDetected}>{scannedProduct.title}</Text>
            <Text style={styles.productCode}>SKU: {scannedProduct.barcode}</Text>

            {!showIncidenceForm ? (
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, styles.btnSuccess]} onPress={() => saveAudit('AUDIT_CHECK')} disabled={isProcessing}>
                  <MaterialIcons name="check-circle" size={24} color="#FFF" />
                  <Text style={styles.btnText}>{isProcessing ? 'Guardando...' : 'Stock Exacto'}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.actionBtn, styles.btnWarning]} onPress={() => setShowIncidenceForm(true)} disabled={isProcessing}>
                  <MaterialIcons name="warning" size={24} color="#FFF" />
                  <Text style={styles.btnText}>Incidencia</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.incidenceForm}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Describe la incidencia (opcional)..."
                  value={observation}
                  onChangeText={setObservation}
                  multiline
                />
                
                <AudioRecorder isRecording={isRecordingUI} hasAudio={hasAudio} onToggle={toggleRecording} />
                
                <TouchableOpacity style={[styles.submitBtn, styles.btnWarning]} onPress={() => saveAudit('INCIDENCE')} disabled={isProcessing}>
                  <MaterialIcons name="save" size={24} color="#FFF" />
                  <Text style={styles.btnText}>{isProcessing ? 'Guardando...' : 'Guardar Incidencia'}</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Cancelar y volver</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  permissionText: { fontSize: 18, color: '#0A2540', marginVertical: 16, fontWeight: '600' },
  primaryButton: { backgroundColor: '#007AFF', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  actionCard: { backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: -8 }, shadowOpacity: 0.1, elevation: 16 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#DFE3E8', borderRadius: 10, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 14, color: '#637A92', textTransform: 'uppercase', fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
  productDetected: { fontSize: 24, fontWeight: '800', color: '#0A2540', marginBottom: 4 },
  productCode: { fontSize: 14, color: '#8898AA', marginBottom: 24 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  actionBtn: { flex: 1, flexDirection: 'row', padding: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
  submitBtn: { flexDirection: 'row', padding: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  btnSuccess: { backgroundColor: '#00C853' },
  btnWarning: { backgroundColor: '#FF9500' },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 15, marginLeft: 8 },
  incidenceForm: { marginTop: 8 },
  textInput: { backgroundColor: '#F0F4F8', borderRadius: 12, padding: 16, fontSize: 16, color: '#0A2540', minHeight: 80, textAlignVertical: 'top', marginBottom: 16 },
  cancelBtn: { padding: 16, alignItems: 'center', marginTop: 8 },
  cancelBtnText: { color: '#637A92', fontWeight: '600', fontSize: 16 },
});