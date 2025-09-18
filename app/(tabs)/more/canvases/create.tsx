import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Save, X, Type, List, Image, Video, Paperclip, Link } from 'lucide-react-native';
import Header from '@/components/common/Header';

const contentTypes = [
  { id: 'text', name: 'Text', icon: Type, description: 'Add paragraphs and formatted text' },
  { id: 'header', name: 'Header', icon: Type, description: 'Section headers and titles' },
  { id: 'list', name: 'List', icon: List, description: 'Bullet points and numbered lists' },
  { id: 'image', name: 'Image', icon: Image, description: 'Upload or embed images' },
  { id: 'video', name: 'Video', icon: Video, description: 'Embed videos and recordings' },
  { id: 'file', name: 'File', icon: Paperclip, description: 'Attach files and documents' },
  { id: 'link', name: 'Link', icon: Link, description: 'Add external links' },
];

export default function CreateCanvas() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    { id: 'meeting', name: 'Meeting Notes', preview: 'Pre-structured for agendas, notes, and action items' },
    { id: 'project', name: 'Project Brief', preview: 'Goals, timeline, stakeholders, and deliverables' },
    { id: 'brainstorm', name: 'Brainstorming', preview: 'Ideas, concepts, and creative collaboration' },
    { id: 'blank', name: 'Blank Canvas', preview: 'Start from scratch with unlimited flexibility' },
  ];

  const handleCreateCanvas = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your canvas');
      return;
    }

    // Here you would create the canvas and navigate to the editor
    Alert.alert('Canvas Created', `"${title}" has been created successfully`, [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create Canvas"
        showBack={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Canvas Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter canvas title..."
            value={title}
            onChangeText={setTitle}
            autoFocus={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Template</Text>
          <Text style={styles.sectionSubtitle}>Start with a pre-built structure or create from scratch</Text>
          
          <View style={styles.templateGrid}>
            {templates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  selectedTemplate === template.id && styles.selectedTemplate
                ]}
                onPress={() => setSelectedTemplate(template.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.templateName,
                  selectedTemplate === template.id && styles.selectedTemplateName
                ]}>
                  {template.name}
                </Text>
                <Text style={[
                  styles.templatePreview,
                  selectedTemplate === template.id && styles.selectedTemplatePreview
                ]}>
                  {template.preview}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Types Available</Text>
          <Text style={styles.sectionSubtitle}>Rich content blocks you can add to your canvas</Text>
          
          <View style={styles.contentTypesList}>
            {contentTypes.map((type) => (
              <View key={type.id} style={styles.contentTypeCard}>
                <View style={styles.contentTypeIcon}>
                  <type.icon size={20} color="#3B82F6" />
                </View>
                <View style={styles.contentTypeInfo}>
                  <Text style={styles.contentTypeName}>{type.name}</Text>
                  <Text style={styles.contentTypeDescription}>{type.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <X size={20} color="#6B7280" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.createButton, !title.trim() && styles.disabledButton]}
          onPress={handleCreateCanvas}
          activeOpacity={0.7}
          disabled={!title.trim()}
        >
          <Save size={20} color="#ffffff" />
          <Text style={styles.createText}>Create Canvas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  titleInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  templateGrid: {
    gap: 12,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedTemplate: {
    borderColor: '#3B82F6',
    backgroundColor: '#eff6ff',
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  selectedTemplateName: {
    color: '#3B82F6',
  },
  templatePreview: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  selectedTemplatePreview: {
    color: '#1e40af',
  },
  contentTypesList: {
    gap: 8,
  },
  contentTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  contentTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentTypeInfo: {
    flex: 1,
  },
  contentTypeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  contentTypeDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  createButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  createText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
});