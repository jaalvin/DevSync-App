import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, FileText, Clock, Users, Search, Filter } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { Canvas } from '@/types/canvas';

const mockCanvases: Canvas[] = [
  {
    id: '1',
    title: 'Project Planning Meeting Notes',
    content: [],
    isTemplate: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'John Doe',
    starred: true,
    permissions: { canEdit: true, canComment: true, canShare: true, viewers: [], editors: [] },
    comments: [],
  },
  {
    id: '2',
    title: 'Q1 Marketing Campaign',
    content: [],
    isTemplate: false,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    createdBy: 'Jane Smith',
    starred: false,
    permissions: { canEdit: true, canComment: true, canShare: true, viewers: [], editors: [] },
    comments: [],
  },
  {
    id: '3',
    title: 'Team Onboarding Checklist',
    content: [],
    isTemplate: true,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    createdBy: 'Admin',
    starred: false,
    permissions: { canEdit: false, canComment: true, canShare: true, viewers: [], editors: [] },
    comments: [],
  },
];

const templates = [
  { id: 'meeting', name: 'Meeting Notes', description: 'Structured template for meeting documentation' },
  { id: 'project', name: 'Project Brief', description: 'Comprehensive project planning template' },
  { id: 'brainstorm', name: 'Brainstorming', description: 'Creative ideation and concept development' },
];

export default function CanvasesIndex() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'recent' | 'starred' | 'templates'>('recent');

  const filteredCanvases = mockCanvases.filter(canvas => {
    if (activeTab === 'starred') return canvas.starred;
    if (activeTab === 'templates') return canvas.isTemplate;
    return !canvas.isTemplate;
  });

  const renderCanvas = ({ item }: { item: Canvas }) => (
    <TouchableOpacity
      style={styles.canvasCard}
      onPress={() => router.push(`/more/canvases/${item.id}` as any)}
      activeOpacity={0.7}
    >
      <View style={styles.canvasHeader}>
        <View style={styles.canvasIcon}>
          <FileText size={20} color="#3B82F6" />
        </View>
        <View style={styles.canvasInfo}>
          <Text style={styles.canvasTitle}>{item.title}</Text>
          <View style={styles.canvasMeta}>
            <Clock size={12} color="#9CA3AF" />
            <Text style={styles.canvasMetaText}>
              Updated {item.updatedAt.toLocaleDateString()}
            </Text>
            {item.starred && <Star size={12} color="#F59E0B" fill="#F59E0B" />}
          </View>
        </View>
      </View>
      <View style={styles.canvasFooter}>
        <View style={styles.authorInfo}>
          <Text style={styles.authorText}>by {item.createdBy}</Text>
        </View>
        <View style={styles.collaborators}>
          <Users size={14} color="#6B7280" />
          <Text style={styles.collaboratorCount}>3</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTemplate = (template: any) => (
    <TouchableOpacity
      key={template.id}
      style={styles.templateCard}
      onPress={() => router.push('/more/canvases/create' as any)}
      activeOpacity={0.7}
    >
      <Text style={styles.templateName}>{template.name}</Text>
      <Text style={styles.templateDescription}>{template.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Canvases"
        subtitle={`${filteredCanvases.length} ${activeTab === 'templates' ? 'templates' : 'canvases'}`}
        showAdd={true}
        showSearch={true}
        onAddPress={() => router.push('/more/canvases/create' as any)}
        onSearchPress={() => {}}
      />

      <View style={styles.tabBar}>
        {[
          { key: 'recent', label: 'Recent' },
          { key: 'starred', label: 'Starred' },
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
            data={filteredCanvases}
            renderItem={renderCanvas}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.canvasList}
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
  canvasList: {
    padding: 20,
  },
  canvasCard: {
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
  canvasHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  canvasIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  canvasInfo: {
    flex: 1,
  },
  canvasTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  canvasMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  canvasMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    marginRight: 8,
  },
  canvasFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flex: 1,
  },
  authorText: {
    fontSize: 12,
    color: '#6b7280',
  },
  collaborators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collaboratorCount: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
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