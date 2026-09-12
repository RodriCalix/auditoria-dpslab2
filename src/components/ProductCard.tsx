import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Product } from '../types/Product';

export default function ProductCard({ item }: { item: Product }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.stockRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Stock: {item.expectedStock}</Text>
          </View>
          <Text style={styles.price}>${item.unitPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.barcodeRow}>
          <MaterialIcons name="qr-code" size={16} color="#aaa" />
          <Text style={styles.barcodeText}>{item.barcode}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 20, padding: 12, marginBottom: 16, shadowColor: '#0A2540', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  image: { width: 90, height: 90, borderRadius: 16, backgroundColor: '#F0F4F8' },
  info: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: '#0A2540', marginBottom: 2 },
  category: { fontSize: 13, color: '#637A92', marginBottom: 8 },
  stockRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badge: { backgroundColor: '#E3F2FD', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#007AFF', fontSize: 12, fontWeight: '700' },
  price: { fontSize: 16, fontWeight: '800', color: '#00C853' },
  barcodeRow: { flexDirection: 'row', alignItems: 'center' },
  barcodeText: { fontSize: 12, color: '#8898AA', marginLeft: 4, letterSpacing: 1 },
});