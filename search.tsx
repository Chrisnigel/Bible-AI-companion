import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { Clock, Trash2 } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import VerseCard from '@/components/VerseCard';
import AIExplanation from '@/components/AIExplanation';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import colors from '@/constants/colors';
import { popularSearches } from '@/mocks/popular-searches';
import { useBibleStore } from '@/store/bible-store';
import { dailyVerses } from '@/mocks/daily-verses';

export default function SearchScreen() {
  const { searchHistory, addSearchQuery, clearSearchHistory } = useBibleStore();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    addSearchQuery(query);
    
    // Simulate search with a delay
    setTimeout(() => {
      // Simple mock search that filters verses containing the query
      const results = dailyVerses.filter(verse => 
        verse.text.toLowerCase().includes(query.toLowerCase()) ||
        verse.reference.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setSelectedVerse(null);
      setIsLoading(false);
    }, 500);
  };
  
  const handleSelectVerse = (verse: any) => {
    setSelectedVerse(verse);
  };
  
  const renderSearchHistory = () => {
    if (searchHistory.length === 0) return null;
    
    return (
      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <TouchableOpacity onPress={clearSearchHistory}>
            <Trash2 size={18} color={colors.textLight} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.historyScroll}>
          {searchHistory.map((query, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.historyItem}
              onPress={() => handleSearch(query)}
            >
              <Clock size={14} color={colors.textLight} />
              <Text style={styles.historyText}>{query}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  const renderPopularSearches = () => {
    return (
      <View style={styles.popularContainer}>
        <Text style={styles.sectionTitle}>Popular Topics</Text>
        <View style={styles.popularGrid}>
          {popularSearches.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.popularItem}
              onPress={() => handleSearch(item.query)}
            >
              <Text style={styles.popularText}>{item.query}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Search Bible' }} />
      
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        
        {isLoading ? (
          <LoadingIndicator message="Searching the Bible..." />
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <VerseCard
                  reference={item.reference}
                  text={item.text}
                  translation={item.translation}
                  onPress={() => handleSelectVerse(item)}
                />
                {selectedVerse && selectedVerse.id === item.id && (
                  <AIExplanation 
                    reference={item.reference}
                    verseText={item.text}
                  />
                )}
              </View>
            )}
            contentContainerStyle={styles.resultsList}
          />
        ) : (
          <ScrollView>
            {renderSearchHistory()}
            {renderPopularSearches()}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  historyContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyScroll: {
    flexDirection: 'row',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  historyText: {
    color: colors.textLight,
    marginLeft: 6,
  },
  popularContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularItem: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    margin: 4,
  },
  popularText: {
    color: colors.primary,
    fontWeight: '500',
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
    marginBottom: 16,
  },
});