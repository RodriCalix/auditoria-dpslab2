import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppSelector } from '../../context/redux/hooks';
import AuditLogItem from '../../components/AuditLogItem';

export default function AuditLogScreen() {
  const logs = useAppSelector((state) => state.audit.logs);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bitácora de Auditoría</Text>
        <Text style={styles.headerSubtitle}>{logs.length} movimientos registrados</Text>
      </View>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="history-toggle-off" size={64} color="#DFE3E8" />
            <Text style={styles.emptyText}>No hay auditorías registradas hoy.</Text>
          </View>
        }
        renderItem={({ item }) => <AuditLogItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#0A2540', padding: 24, paddingTop: 48, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFF' },
  headerSubtitle: { fontSize: 14, color: '#ADBDCC', marginTop: 4 },
  listPadding: { paddingHorizontal: 16, paddingBottom: 40 },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyText: { color: '#8898AA', fontSize: 16, marginTop: 16, fontWeight: '600' },
});