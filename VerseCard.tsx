import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Platform } from 'react-native';
import { BookmarkPlus, BookmarkCheck, Share2 } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useBibleStore } from '@/store/bible-store';

type VerseCardProps = {
  reference: string;
  text: string;
  translation: string;
  onPress?: () => void;
};

export default function VerseCard({ reference, text, translation, onPress }: VerseCardProps) {
  const { savedVerses, addSavedVerse, removeSavedVerse } = useBibleStore();
  
  const verseId = `${reference}-${translation}`;
  const isSaved = savedVerses.some(verse => verse.id === verseId);
  
  const handleSave = () => {
    if (isSaved) {
      removeSavedVerse(verseId);
    } else {
      addSavedVerse({
        id: verseId,
        reference,
        text,
        translation
      });
    }
  };
  
  const handleShare = async () => {
    try {
      const shareContent = {
        message: `"${text}" - ${reference} (${translation.toUpperCase()})`,
        title: 'Share Bible Verse',
      };
      
      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: shareContent.title,
            text: shareContent.message,
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          alert(`Copied to clipboard: ${shareContent.message}`);
        }
      } else {
        await Share.share(shareContent);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.reference}>{reference}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
            {isSaved ? (
              <BookmarkCheck size={20} color={colors.primary} />
            ) : (
              <BookmarkPlus size={20} color={colors.textLight} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Share2 size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.verseText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.divider,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reference: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 12,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
});