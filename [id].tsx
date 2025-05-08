import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useBibleStore } from '@/store/bible-store';
import VerseCard from '@/components/VerseCard';
import AIExplanation from '@/components/AIExplanation';
import colors from '@/constants/colors';
import { dailyVerses } from '@/mocks/daily-verses';

export default function VerseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [verse, setVerse] = useState(dailyVerses[0]);
  
  useEffect(() => {
    // Find the verse from our mock data
    // In a real app, you would fetch this from an API or database
    const foundVerse = dailyVerses.find(v => v.id.toString() === id);
    if (foundVerse) {
      setVerse(foundVerse);
    }
  }, [id]);
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: verse.reference,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <VerseCard
          reference={verse.reference}
          text={verse.text}
          translation={verse.translation}
        />
        
        <AIExplanation
          reference={verse.reference}
          verseText={verse.text}
        />
        
        <View style={styles.contextSection}>
          <Text style={styles.sectionTitle}>Historical Context</Text>
          <Text style={styles.contextText}>
            This passage was written during a time of significant religious and cultural change.
            The author was addressing a community facing challenges in their faith journey.
            Understanding the historical background helps illuminate the deeper meaning of this text.
          </Text>
        </View>
        
        <View style={styles.applicationSection}>
          <Text style={styles.sectionTitle}>Application</Text>
          <Text style={styles.applicationText}>
            Consider how this verse might apply to your life today:
          </Text>
          <View style={styles.applicationPoint}>
            <View style={styles.bulletPoint} />
            <Text style={styles.applicationPointText}>
              Reflect on how this teaching can guide your daily decisions
            </Text>
          </View>
          <View style={styles.applicationPoint}>
            <View style={styles.bulletPoint} />
            <Text style={styles.applicationPointText}>
              Consider sharing this wisdom with someone who might need encouragement
            </Text>
          </View>
          <View style={styles.applicationPoint}>
            <View style={styles.bulletPoint} />
            <Text style={styles.applicationPointText}>
              Journal about how this verse speaks to your current circumstances
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  contextSection: {
    marginTop: 24,
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  contextText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  applicationSection: {
    marginTop: 24,
    backgroundColor: colors.secondaryLight,
    borderRadius: 12,
    padding: 16,
  },
  applicationText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  applicationPoint: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginTop: 8,
    marginRight: 8,
  },
  applicationPointText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
});