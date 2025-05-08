import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import colors from '@/constants/colors';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder = "Search the Bible..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleClear = () => {
    setQuery('');
  };
  
  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});