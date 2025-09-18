import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, Plus, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showAdd?: boolean;
  showMore?: boolean;
  onAddPress?: () => void;
  onSearchPress?: () => void;
  onMorePress?: () => void;
}

export default function Header({
  title,
  subtitle,
  showBack = false,
  showSearch = false,
  showAdd = false,
  showMore = false,
  onAddPress,
  onSearchPress,
  onMorePress,
}: HeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color="#1f2937" />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onSearchPress}
              activeOpacity={0.7}
            >
              <Search size={24} color="#1f2937" />
            </TouchableOpacity>
          )}
          {showAdd && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onAddPress}
              activeOpacity={0.7}
            >
              <Plus size={24} color="#1f2937" />
            </TouchableOpacity>
          )}
          {showMore && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onMorePress}
              activeOpacity={0.7}
            >
              <MoreHorizontal size={24} color="#1f2937" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});