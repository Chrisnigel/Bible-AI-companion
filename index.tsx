import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { RefreshCw, BookOpen, MessageSquare } from 'lucide-react-native';
import { Stack, router } from 'expo-router';
import { useBibleStore } from '@/store/bible-store';
import VerseCard from '@/components/VerseCard';
import colors from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

export default function HomeScreen() {
  const { dailyVerse, refreshDailyVerse } = useBibleStore();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!dailyVerse) {
      handleRefresh();
    }
  }, []);
  
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Use a timeout to simulate network request and prevent UI freezing
    setTimeout(() => {
      refreshDailyVerse();
      setIsLoading(false);
    }, 300);
  };

  const handleReadBible = () => {
    router.push('/bible-reader');
  };

  const handleAskAI = async () => {
    // Open ChatGPT in browser
    try {
      if (Platform.OS === 'web') {
        window.open('https://chat.openai.com', '_blank');
      } else {
        await WebBrowser.openBrowserAsync('https://chat.openai.com');
      }
    } catch (error) {
      console.error('Failed to open ChatGPT:', error);
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Bible Companion',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good {getTimeOfDay()}</Text>
          <Text style={styles.subtitle}>Your daily inspiration</Text>
        </View>
        
        <View style={styles.dailyVerseContainer}>
          <View style={styles.dailyVerseHeader}>
            <Text style={styles.dailyVerseTitle}>Verse of the Day</Text>
            <TouchableOpacity 
              onPress={handleRefresh} 
              style={styles.refreshButton}
              disabled={isLoading}
            >
              <RefreshCw size={18} color={isLoading ? colors.textLight : colors.primary} />
            </TouchableOpacity>
          </View>
          
          {dailyVerse ? (
            <VerseCard
              reference={dailyVerse.reference}
              text={dailyVerse.text}
              translation={dailyVerse.translation}
              onPress={() => router.push(`/verse/${dailyVerse.id}`)}
            />
          ) : (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading daily verse...</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={handleReadBible}>
            <LinearGradient
              colors={[colors.primary, '#4A6FEF']}
              style={styles.actionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <BookOpen size={24} color="#FFFFFF" />
              <Text style={styles.actionCardText}>Read Bible</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleAskAI}>
            <LinearGradient
              colors={[colors.secondary, '#FFA726']}
              style={styles.actionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MessageSquare size={24} color="#FFFFFF" />
              <Text style={styles.actionCardText}>Ask AI</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inspirationContainer}>
          <Text style={styles.inspirationTitle}>Weekly Focus</Text>
          <Text style={styles.inspirationText}>
            "Faith is taking the first step even when you don't see the whole staircase."
          </Text>
          <Text style={styles.inspirationAuthor}>- Martin Luther King Jr.</Text>
        </View>
      </ScrollView>
    </>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
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
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  dailyVerseContainer: {
    marginBottom: 24,
  },
  dailyVerseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyVerseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  refreshButton: {
    padding: 4,
  },
  loadingContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
  },
  loadingText: {
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    maxWidth: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionCardGradient: {
    padding: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCardText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 12,
  },
  inspirationContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 20,
  },
  inspirationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  inspirationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.text,
    lineHeight: 24,
  },
  inspirationAuthor: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'right',
  },
});