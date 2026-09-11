import { View, Text, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

interface CameraScannerProps {
  isActive: boolean;
  onBarcodeScanned: (result: { data: string }) => void;
}

export default function CameraScanner({ isActive, onBarcodeScanned }: CameraScannerProps) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={isActive ? onBarcodeScanned : undefined}
        barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'] }}
      />
      {isActive && (
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerFrame} />
          <Text style={styles.scanInstruction}>Enfoca el código de barras</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scannerOverlay: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  scannerFrame: { width: 250, height: 250, borderWidth: 2, borderColor: '#00C853', borderRadius: 24, backgroundColor: 'transparent' },
  scanInstruction: { color: '#FFF', marginTop: 24, fontSize: 16, fontWeight: '600', letterSpacing: 0.5 },
});