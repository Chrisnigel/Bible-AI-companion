import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Linking } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import colors from '@/constants/colors';
import * as WebBrowser from 'expo-web-browser';

type AIExplanationProps = {
  reference: string;
  verseText: string;
};

export default function AIExplanation({ reference, verseText }: AIExplanationProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const getExplanation = async () => {
    if (explanation) {
      setExpanded(!expanded);
      return;
    }

    // Open ChatGPT instead of generating an explanation
    try {
      const query = encodeURIComponent(`Explain the Bible verse: "${verseText}" (${reference})`);
      const chatGptUrl = `https://chat.openai.com/share/${query}`;
      
      if (Platform.OS === 'web') {
        window.open(chatGptUrl, '_blank');
      } else {
        await WebBrowser.openBrowserAsync('https://chat.openai.com');
      }
    } catch (err) {
      setError("Couldn't open ChatGPT. Please try again.");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={getExplanation}
        disabled={isLoading}
      >
        <MessageSquare size={18} color={colors.primary} />
        <Text style={styles.buttonText}>
          Ask ChatGPT about this verse
        </Text>
        {isLoading && <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {explanation && expanded && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  loader: {
    marginLeft: 8,
  },
  errorText: {
    color: colors.error,
    marginTop: 8,
    fontSize: 14,
  },
  explanationContainer: {
    backgroundColor: colors.backgroundDark,
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
});