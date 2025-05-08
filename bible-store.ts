import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_TRANSLATION } from '@/constants/translations';
import { getRandomDailyVerse } from '@/mocks/daily-verses';

export type Verse = {
  id: string;
  reference: string;
  text: string;
  translation: string;
};

type BibleState = {
  savedVerses: Verse[];
  preferredTranslation: string;
  searchHistory: string[];
  dailyVerse: Verse | null;
  isLoading: boolean;
  error: string | null;
  addSavedVerse: (verse: Verse) => void;
  removeSavedVerse: (id: string) => void;
  setPreferredTranslation: (translation: string) => void;
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;
  refreshDailyVerse: () => void;
};

export const useBibleStore = create<BibleState>()(
  persist(
    (set, get) => ({
      savedVerses: [],
      preferredTranslation: DEFAULT_TRANSLATION,
      searchHistory: [],
      dailyVerse: null,
      isLoading: false,
      error: null,
      
      addSavedVerse: (verse) => {
        const uniqueId = `${verse.reference}-${verse.translation}`;
        const verseWithId = { ...verse, id: uniqueId };
        
        set((state) => {
          // Check if verse already exists
          const exists = state.savedVerses.some(v => v.id === uniqueId);
          if (exists) return state;
          
          return {
            savedVerses: [...state.savedVerses, verseWithId]
          };
        });
      },
      
      removeSavedVerse: (id) => {
        set((state) => ({
          savedVerses: state.savedVerses.filter(verse => verse.id !== id)
        }));
      },
      
      setPreferredTranslation: (translation) => {
        set({ preferredTranslation: translation });
      },
      
      addSearchQuery: (query) => {
        set((state) => {
          // Don't add duplicates
          if (state.searchHistory.includes(query)) return state;
          
          // Keep only the last 10 searches
          const newHistory = [query, ...state.searchHistory].slice(0, 10);
          return { searchHistory: newHistory };
        });
      },
      
      clearSearchHistory: () => {
        set({ searchHistory: [] });
      },
      
      refreshDailyVerse: () => {
        const newDailyVerse = getRandomDailyVerse();
        // Convert the id to string to match the Verse type
        set({ 
          dailyVerse: {
            ...newDailyVerse,
            id: String(newDailyVerse.id)
          }
        });
      },
    }),
    {
      name: 'bible-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Add partial option to avoid persisting everything
      partialize: (state) => ({
        savedVerses: state.savedVerses,
        preferredTranslation: state.preferredTranslation,
        searchHistory: state.searchHistory,
        // Don't persist dailyVerse, isLoading, or error
      }),
    }
  )
);