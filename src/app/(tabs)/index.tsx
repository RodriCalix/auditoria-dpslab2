import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CATALOG } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';

export default function CatalogScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', ...Array.from(new Set(CATALOG.map((p) => p.category)))];

  const filteredProducts = CATALOG.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="inventory" size={64} color="#DFE3E8" />
      <Text style={styles.emptyText}>
        {selectedCategory === 'Todas' 
          ? 'No hay existencia' 
          : 'No disponible en esta categoría'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestión de Bodega</Text>
        <Text style={styles.headerSubtitle}>Total en sistema: {CATALOG.length} Productos</Text>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listPadding, filteredProducts.length === 0 && styles.listEmptyPadding]}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#0A2540', padding: 24, paddingTop: 48, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFF' },
  headerSubtitle: { fontSize: 14, color: '#ADBDCC', marginTop: 4 },
  filterContainer: { marginBottom: 12 },
  filterScroll: { paddingHorizontal: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#E3F2FD', borderRadius: 20, marginRight: 8 },
  filterChipActive: { backgroundColor: '#007AFF' },
  filterText: { color: '#007AFF', fontWeight: '600', fontSize: 14 },
  filterTextActive: { color: '#FFF' },
  listPadding: { paddingHorizontal: 16, paddingBottom: 24 },
  listEmptyPadding: { flexGrow: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#8898AA', fontSize: 16, marginTop: 16, fontWeight: '600' },
});