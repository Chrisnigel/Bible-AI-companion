import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { BookmarkX } from 'lucide-react-native';
import { useBibleStore } from '@/store/bible-store';
import VerseCard from '@/components/VerseCard';
import EmptyState from '@/components/EmptyState';
import colors from '@/constants/colors';

export default function SavedScreen() {
  const { savedVerses } = useBibleStore();
  
  return (
    <>
      <Stack.Screen options={{ title: 'Saved Verses' }} />
      
      <View style={styles.container}>
        {savedVerses.length > 0 ? (
          <FlatList
            data={savedVerses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <VerseCard
                reference={item.reference}
                text={item.text}
                translation={item.translation}
              />
            )}
            contentContainerStyle={styles.list}
          />
        ) : (
          <EmptyState
            title="No saved verses yet"
            message="Bookmark verses as you read to save them for later reference."
            icon={<BookmarkX size={48} color={colors.textLight} />}
          />
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
  list: {
    padding: 16,
  },
});