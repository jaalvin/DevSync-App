import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { FileText, SquareCheck as CheckSquare, UserCheck, Link2, Settings, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

interface MoreOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
  badge?: string;
}

export default function MoreTab() {
  const router = useRouter();

  const premiumFeatures: MoreOption[] = [
    {
      id: 'canvases',
      title: 'Canvases',
      description: 'Rich content and collaborative documents',
      icon: FileText,
      route: '/more/canvases',
    },
    {
      id: 'lists',
      title: 'Lists',
      description: 'Project management and task tracking',
      icon: CheckSquare,
      route: '/more/lists',
    },
    {
      id: 'assigned',
      title: 'Assigned to you',
      description: 'All your tasks in one place',
      icon: UserCheck,
      route: '/more/assigned',
      badge: '3',
    },
    {
      id: 'connections',
      title: 'External connections',
      description: 'Manage external organizations',
      icon: Link2,
      route: '/more/connections',
    },
  ];

  const otherOptions: MoreOption[] = [
    {
      id: 'settings',
      title: 'Settings',
      description: 'Preferences and account settings',
      icon: Settings,
      route: '/settings',
    },
    {
      id: 'help',
      title: 'Help',
      description: 'Support and documentation',
      icon: HelpCircle,
      route: '/help',
    },
  ];

  const renderOption = (option: MoreOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionCard}
      onPress={() => router.push(option.route as any)}
      activeOpacity={0.7}
    >
      <View style={styles.optionIcon}>
        <option.icon size={24} color="#3B82F6" />
      </View>
      <View style={styles.optionContent}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          {option.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{option.badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>More</Text>
          <Text style={styles.headerSubtitle}>Tools and features to enhance your productivity</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          <View style={styles.sectionContent}>
            {premiumFeatures.map(renderOption)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other</Text>
          <View style={styles.sectionContent}>
            {otherOptions.map(renderOption)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});