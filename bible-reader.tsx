import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useBibleStore } from '@/store/bible-store';

// Define the BibleBook type
interface BibleBook {
  id: string;
  name: string;
  chapters: number;
}

// Mock Bible chapters
const bibleBooks: BibleBook[] = [
  { id: 'genesis', name: 'Genesis', chapters: 50 },
  { id: 'exodus', name: 'Exodus', chapters: 40 },
  { id: 'leviticus', name: 'Leviticus', chapters: 27 },
  { id: 'numbers', name: 'Numbers', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34 },
  { id: 'matthew', name: 'Matthew', chapters: 28 },
  { id: 'mark', name: 'Mark', chapters: 16 },
  { id: 'luke', name: 'Luke', chapters: 24 },
  { id: 'john', name: 'John', chapters: 21 },
  { id: 'acts', name: 'Acts', chapters: 28 },
];

// Mock chapter content
const mockChapterContent = `
1 In the beginning God created the heaven and the earth.
2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.
3 And God said, Let there be light: and there was light.
4 And God saw the light, that it was good: and God divided the light from the darkness.
5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.
6 And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.
7 And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.
8 And God called the firmament Heaven. And the evening and the morning were the second day.
9 And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.
10 And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.
`;

export default function BibleReaderScreen() {
  const { preferredTranslation } = useBibleStore();
  const [selectedBook, setSelectedBook] = useState(bibleBooks[0]);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [showBookSelector, setShowBookSelector] = useState(false);
  
  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter(selectedChapter + 1);
    } else if (bibleBooks.indexOf(selectedBook) < bibleBooks.length - 1) {
      // Move to next book
      const nextBook = bibleBooks[bibleBooks.indexOf(selectedBook) + 1];
      setSelectedBook(nextBook);
      setSelectedChapter(1);
    }
  };
  
  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else if (bibleBooks.indexOf(selectedBook) > 0) {
      // Move to previous book
      const prevBook = bibleBooks[bibleBooks.indexOf(selectedBook) - 1];
      setSelectedBook(prevBook);
      setSelectedChapter(prevBook.chapters);
    }
  };
  
  const toggleBookSelector = () => {
    setShowBookSelector(!showBookSelector);
  };
  
  const selectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setShowBookSelector(false);
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Bible Reader',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.bookSelector} onPress={toggleBookSelector}>
            <BookOpen size={18} color={colors.primary} />
            <Text style={styles.bookTitle}>{selectedBook.name} {selectedChapter}</Text>
            <Text style={styles.translationText}>{preferredTranslation.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
        
        {showBookSelector ? (
          <ScrollView style={styles.bookList}>
            {bibleBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={[
                  styles.bookItem,
                  selectedBook.id === book.id && styles.selectedBookItem
                ]}
                onPress={() => selectBook(book)}
              >
                <Text 
                  style={[
                    styles.bookItemText,
                    selectedBook.id === book.id && styles.selectedBookItemText
                  ]}
                >
                  {book.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <>
            <ScrollView style={styles.chapterContent}>
              <Text style={styles.verseText}>{mockChapterContent}</Text>
            </ScrollView>
            
            <View style={styles.navigation}>
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={handlePreviousChapter}
                disabled={selectedChapter === 1 && bibleBooks.indexOf(selectedBook) === 0}
              >
                <ChevronLeft size={24} color={colors.primary} />
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              
              <Text style={styles.chapterIndicator}>
                {selectedChapter} / {selectedBook.chapters}
              </Text>
              
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={handleNextChapter}
                disabled={selectedChapter === selectedBook.chapters && bibleBooks.indexOf(selectedBook) === bibleBooks.length - 1}
              >
                <Text style={styles.navButtonText}>Next</Text>
                <ChevronRight size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </>
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  bookSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  translationText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
  },
  bookList: {
    flex: 1,
  },
  bookItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  selectedBookItem: {
    backgroundColor: colors.primaryLight,
  },
  bookItemText: {
    fontSize: 16,
    color: colors.text,
  },
  selectedBookItemText: {
    color: colors.primary,
    fontWeight: '600',
  },
  chapterContent: {
    flex: 1,
    padding: 16,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.text,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  chapterIndicator: {
    fontSize: 14,
    color: colors.textLight,
  },
});