import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Save, X, LayoutGrid, List as ListIcon, Settings } from 'lucide-react-native';
import Header from '@/components/common/Header';

const listTemplates = [
  {
    id: 'project',
    name: 'Project Plan',
    description: 'Comprehensive project management with milestones and deliverables',
    fields: ['Title', 'Assignee', 'Due Date', 'Priority', 'Status', 'Category'],
    viewType: 'table' as const,
  },
  {
    id: 'sprint',
    name: 'Sprint Board',
    description: 'Agile development with backlog, in progress, and done columns',
    fields: ['Title', 'Assignee', 'Story Points', 'Sprint', 'Status'],
    viewType: 'board' as const,
  },
  {
    id: 'todos',
    name: 'To-Do List',
    description: 'Simple task management for personal productivity',
    fields: ['Title', 'Due Date', 'Priority', 'Completed'],
    viewType: 'table' as const,
  },
  {
    id: 'bugs',
    name: 'Bug Tracker',
    description: 'Issue tracking with severity and resolution status',
    fields: ['Title', 'Assignee', 'Severity', 'Status', 'Reporter', 'Created Date'],
    viewType: 'table' as const,
  },
  {
    id: 'blank',
    name: 'Blank List',
    description: 'Start from scratch with customizable fields',
    fields: ['Title'],
    viewType: 'table' as const,
  },
];

export default function CreateList() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'table' | 'board'>('table');

  const selectedTemplateData = listTemplates.find(t => t.id === selectedTemplate);

  const handleCreateList = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your list');
      return;
    }

    if (!selectedTemplate) {
      Alert.alert('Select Template', 'Please choose a template to get started');
      return;
    }

    // Here you would create the list and navigate to it
    Alert.alert('List Created', `"${title}" has been created successfully`, [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create List"
        showBack={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>List Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter list title..."
              value={title}
              onChangeText={setTitle}
              autoFocus={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe the purpose of this list..."
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Default View</Text>
          <Text style={styles.sectionSubtitle}>Choose how you want to view your list items</Text>
          
          <View style={styles.viewTypeSelector}>
            <TouchableOpacity
              style={[styles.viewTypeButton, viewType === 'table' && styles.selectedViewType]}
              onPress={() => setViewType('table')}
              activeOpacity={0.7}
            >
              <ListIcon size={20} color={viewType === 'table' ? '#ffffff' : '#6B7280'} />
              <Text style={[styles.viewTypeText, viewType === 'table' && styles.selectedViewTypeText]}>
                Table
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.viewTypeButton, viewType === 'board' && styles.selectedViewType]}
              onPress={() => setViewType('board')}
              activeOpacity={0.7}
            >
              <LayoutGrid size={20} color={viewType === 'board' ? '#ffffff' : '#6B7280'} />
              <Text style={[styles.viewTypeText, viewType === 'board' && styles.selectedViewTypeText]}>
                Board
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Template</Text>
          <Text style={styles.sectionSubtitle}>Templates include pre-configured fields and workflows</Text>
          
          <View style={styles.templateList}>
            {listTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  selectedTemplate === template.id && styles.selectedTemplate
                ]}
                onPress={() => setSelectedTemplate(template.id)}
                activeOpacity={0.7}
              >
                <View style={styles.templateHeader}>
                  <Text style={[
                    styles.templateName,
                    selectedTemplate === template.id && styles.selectedTemplateName
                  ]}>
                    {template.name}
                  </Text>
                  {template.viewType === 'board' && (
                    <LayoutGrid size={16} color={selectedTemplate === template.id ? '#3B82F6' : '#6B7280'} />
                  )}
                </View>
                <Text style={[
                  styles.templateDescription,
                  selectedTemplate === template.id && styles.selectedTemplateDescription
                ]}>
                  {template.description}
                </Text>
                <View style={styles.templateFields}>
                  <Text style={styles.fieldsLabel}>Fields:</Text>
                  <Text style={styles.fieldsText}>{template.fields.join(', ')}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedTemplateData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Template Preview</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>{selectedTemplateData.name}</Text>
              <Text style={styles.previewDescription}>{selectedTemplateData.description}</Text>
              <View style={styles.previewFields}>
                <Text style={styles.previewFieldsTitle}>Included Fields:</Text>
                {selectedTemplateData.fields.map((field, index) => (
                  <View key={index} style={styles.previewField}>
                    <Text style={styles.previewFieldName}>{field}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
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
          style={[
            styles.createButton,
            (!title.trim() || !selectedTemplate) && styles.disabledButton
          ]}
          onPress={handleCreateList}
          activeOpacity={0.7}
          disabled={!title.trim() || !selectedTemplate}
        >
          <Save size={20} color="#ffffff" />
          <Text style={styles.createText}>Create List</Text>
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  viewTypeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  viewTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedViewType: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  viewTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  selectedViewTypeText: {
    color: '#ffffff',
  },
  templateList: {
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
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  selectedTemplateName: {
    color: '#3B82F6',
  },
  templateDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  selectedTemplateDescription: {
    color: '#1e40af',
  },
  templateFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fieldsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginRight: 4,
  },
  fieldsText: {
    fontSize: 12,
    color: '#9ca3af',
    flex: 1,
  },
  previewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  previewDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  previewFields: {
    gap: 8,
  },
  previewFieldsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  previewField: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  previewFieldName: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
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