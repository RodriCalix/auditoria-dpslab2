import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o código EAN..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', backgroundColor: '#FFF', margin: 16, marginTop: -20, borderRadius: 16, padding: 4, shadowColor: '#0A2540', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4, alignItems: 'center' },
  searchIcon: { padding: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#0A2540', paddingVertical: 12 },
});