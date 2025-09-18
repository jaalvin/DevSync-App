import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SquareCheck as CheckSquare, Calendar, User, Tag, Filter, LayoutGrid, List as ListIcon } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { List } from '@/types/lists';

const mockLists: List[] = [
  {
    id: '1',
    title: 'Product Development Sprint',
    description: 'Q1 2024 product features and improvements',
    viewType: 'table',
    fields: [],
    items: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'John Doe',
    starred: true,
    workflows: [],
  },
  {
    id: '2',
    title: 'Marketing Campaign Tasks',
    description: 'Social media and content marketing initiatives',
    viewType: 'board',
    fields: [],
    items: [],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    createdBy: 'Jane Smith',
    starred: false,
    workflows: [],
  },
  {
    id: '3',
    title: 'Bug Tracking',
    description: 'Critical and high-priority bug fixes',
    viewType: 'table',
    fields: [],
    items: [],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    createdBy: 'Mike Johnson',
    starred: true,
    workflows: [],
  },
];

const templates = [
  { id: 'project', name: 'Project Plan', description: 'Comprehensive project management template' },
  { id: 'sprint', name: 'Sprint Board', description: 'Agile development sprint planning' },
  { id: 'todos', name: 'To-Do List', description: 'Simple task management list' },
  { id: 'bugs', name: 'Bug Tracker', description: 'Issue and bug tracking system' },
];

export default function ListsIndex() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'my-lists' | 'templates'>('my-lists');

  const renderList = ({ item }: { item: List }) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => router.push(`/more/lists/${item.id}` as any)}
      activeOpacity={0.7}
    >
      <View style={styles.listHeader}>
        <View style={styles.listIcon}>
          {item.viewType === 'board' ? (
            <LayoutGrid size={20} color="#3B82F6" />
          ) : (
            <ListIcon size={20} color="#3B82F6" />
          )}
        </View>
        <View style={styles.listInfo}>
          <Text style={styles.listTitle}>{item.title}</Text>
          <Text style={styles.listDescription}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.listStats}>
        <View style={styles.stat}>
          <CheckSquare size={16} color="#10B981" />
          <Text style={styles.statText}>12 items</Text>
        </View>
        <View style={styles.stat}>
          <User size={16} color="#F59E0B" />
          <Text style={styles.statText}>3 assigned</Text>
        </View>
        <View style={styles.stat}>
          <Calendar size={16} color="#EF4444" />
          <Text style={styles.statText}>2 overdue</Text>
        </View>
      </View>

      <View style={styles.listFooter}>
        <Text style={styles.createdBy}>by {item.createdBy}</Text>
        <Text style={styles.updatedAt}>
          {item.updatedAt.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTemplate = (template: any) => (
    <TouchableOpacity
      key={template.id}
      style={styles.templateCard}
      onPress={() => router.push('/more/lists/create' as any)}
      activeOpacity={0.7}
    >
      <Text style={styles.templateName}>{template.name}</Text>
      <Text style={styles.templateDescription}>{template.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Lists"
        subtitle={`${activeTab === 'my-lists' ? mockLists.length : templates.length} ${activeTab === 'my-lists' ? 'lists' : 'templates'}`}
        showAdd={true}
        showSearch={true}
        onAddPress={() => router.push('/more/lists/create' as any)}
        onSearchPress={() => {}}
      />

      <View style={styles.tabBar}>
        {[
          { key: 'my-lists', label: 'My Lists' },
          { key: 'templates', label: 'Templates' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === 'templates' ? (
          <ScrollView style={styles.templateList} showsVerticalScrollIndicator={false}>
            <View style={styles.templateGrid}>
              {templates.map(renderTemplate)}
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={mockLists}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#eff6ff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  listsList: {
    padding: 20,
  },
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  listStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdBy: {
    fontSize: 12,
    color: '#6b7280',
  },
  updatedAt: {
    fontSize: 12,
    color: '#9ca3af',
  },
  templateList: {
    flex: 1,
  },
  templateGrid: {
    padding: 20,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});