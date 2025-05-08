import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { ChevronRight, Book, Bell, Moon, HelpCircle, Info } from 'lucide-react-native';
import { useBibleStore } from '@/store/bible-store';
import colors from '@/constants/colors';
import { TRANSLATIONS } from '@/constants/translations';

export default function SettingsScreen() {
  const { preferredTranslation, setPreferredTranslation } = useBibleStore();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  
  const handleTranslationSelect = (translationId: string) => {
    setPreferredTranslation(translationId);
    showToast(`Changed to ${TRANSLATIONS.find(t => t.id === translationId)?.name}`);
  };
  
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    showToast(`Dark mode ${newValue ? 'enabled' : 'disabled'}`);
  };
  
  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    showToast(`Notifications ${newValue ? 'enabled' : 'disabled'}`);
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'web') {
      alert(message);
    } else {
      Alert.alert('Settings Updated', message);
    }
  };
  
  const handleHelpSupport = () => {
    showToast('Help & Support feature coming soon!');
  };
  
  const handleAbout = () => {
    showToast('Bible Companion v1.0.0\nDeveloped with ❤️');
  };
  
  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color={colors.textLight} />}
    </TouchableOpacity>
  );
  
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          {renderSettingItem(
            <Book size={22} color={colors.primary} />,
            'Bible Translation',
            TRANSLATIONS.find(t => t.id === preferredTranslation)?.name,
            undefined,
            () => {/* This is handled in the Bible Translations section below */}
          )}
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Bell size={22} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Daily Notifications</Text>
              <Text style={styles.settingSubtitle}>Receive daily verse notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.divider, true: colors.primaryLight }}
              thumbColor={notifications ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Moon size={22} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingSubtitle}>Switch to dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.divider, true: colors.primaryLight }}
              thumbColor={darkMode ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bible Translations</Text>
          
          {TRANSLATIONS.map((translation) => (
            <TouchableOpacity
              key={translation.id}
              style={styles.translationItem}
              onPress={() => handleTranslationSelect(translation.id)}
            >
              <Text style={styles.translationName}>{translation.name}</Text>
              {preferredTranslation === translation.id && (
                <View style={styles.selectedIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          {renderSettingItem(
            <HelpCircle size={22} color={colors.primary} />,
            'Help & Support',
            'Get assistance with the app',
            undefined,
            handleHelpSupport
          )}
          
          {renderSettingItem(
            <Info size={22} color={colors.primary} />,
            'About Bible Companion',
            'Version 1.0.0',
            undefined,
            handleAbout
          )}
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  translationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  translationName: {
    fontSize: 16,
    color: colors.text,
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});