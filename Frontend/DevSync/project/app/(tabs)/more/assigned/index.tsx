import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Clock, User, ChevronRight } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { Assignment } from '@/types/user';

const mockAssignments: Assignment[] = [
  {
    id: '1',
    itemId: 'item1',
    listId: 'list1',
    listTitle: 'Product Development Sprint',
    itemTitle: 'Implement user authentication',
    dueDate: new Date('2024-01-20'),
    status: 'In Progress',
    priority: 'high',
    assignedAt: new Date('2024-01-15'),
    assignedBy: 'John Doe',
  },
  {
    id: '2',
    itemId: 'item2',
    listId: 'list2',
    listTitle: 'Marketing Campaign',
    itemTitle: 'Create social media graphics',
    dueDate: new Date('2024-01-18'),
    status: 'Todo',
    priority: 'medium',
    assignedAt: new Date('2024-01-14'),
    assignedBy: 'Jane Smith',
  },
  {
    id: '3',
    itemId: 'item3',
    listId: 'list1',
    listTitle: 'Product Development Sprint',
    itemTitle: 'Fix login bug on mobile',
    dueDate: new Date('2024-01-16'),
    status: 'Overdue',
    priority: 'high',
    assignedAt: new Date('2024-01-10'),
    assignedBy: 'Mike Johnson',
  },
  {
    id: '4',
    itemId: 'item4',
    listId: 'list3',
    listTitle: 'Content Planning',
    itemTitle: 'Write blog post about new features',
    status: 'Completed',
    priority: 'low',
    assignedAt: new Date('2024-01-12'),
    assignedBy: 'Sarah Wilson',
  },
];

const filters = [
  { key: 'all', label: 'All', count: 4 },
  { key: 'today', label: 'Today', count: 0 },
  { key: 'overdue', label: 'Overdue', count: 1 },
  { key: 'completed', label: 'Completed', count: 1 },
];

export default function AssignedToYou() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredAssignments = mockAssignments.filter(assignment => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const assignmentDate = assignment.dueDate ? new Date(assignment.dueDate) : null;

    switch (activeFilter) {
      case 'today':
        return assignmentDate && assignmentDate.toDateString() === today.toDateString();
      case 'overdue':
        return assignment.status === 'Overdue' || (assignmentDate && assignmentDate < today && assignment.status !== 'Completed');
      case 'completed':
        return assignment.status === 'Completed';
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (assignment: Assignment) => {
    if (assignment.status === 'Completed') {
      return <CheckCircle2 size={16} color="#10B981" />;
    }
    if (assignment.status === 'Overdue' || (assignment.dueDate && assignment.dueDate < new Date() && assignment.status !== 'Completed')) {
      return <AlertCircle size={16} color="#EF4444" />;
    }
    return <Clock size={16} color="#F59E0B" />;
  };

  const formatDueDate = (dueDate?: Date) => {
    if (!dueDate) return 'No due date';
    
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;
  };

  const handleQuickAction = (assignment: Assignment, action: string) => {
    switch (action) {
      case 'complete':
        Alert.alert('Mark Complete', `Mark "${assignment.itemTitle}" as complete?`);
        break;
      case 'comment':
        Alert.alert('Add Comment', 'Comment functionality would be implemented here');
        break;
      case 'open':
        router.push(`/more/lists/${assignment.listId}` as any);
        break;
    }
  };

  const renderAssignment = ({ item }: { item: Assignment }) => (
    <TouchableOpacity
      style={styles.assignmentCard}
      onPress={() => handleQuickAction(item, 'open')}
      activeOpacity={0.7}
    >
      <View style={styles.assignmentHeader}>
        <View style={styles.statusIndicator}>
          {getStatusIcon(item)}
        </View>
        <View style={styles.assignmentInfo}>
          <Text style={styles.assignmentTitle}>{item.itemTitle}</Text>
          <Text style={styles.listTitle}>{item.listTitle}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>

      <View style={styles.assignmentMeta}>
        {item.dueDate && (
          <View style={styles.metaItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={[
              styles.metaText,
              item.status === 'Overdue' && { color: '#EF4444' }
            ]}>
              {formatDueDate(item.dueDate)}
            </Text>
          </View>
        )}
        <View style={styles.metaItem}>
          <User size={14} color="#6B7280" />
          <Text style={styles.metaText}>Assigned by {item.assignedBy}</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction(item, 'complete')}
        >
          <CheckCircle2 size={16} color="#10B981" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction(item, 'comment')}
        >
          <Text style={styles.quickActionText}>Comment</Text>
        </TouchableOpacity>
        <ChevronRight size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Assigned to you"
        subtitle={`${filteredAssignments.length} tasks`}
        showBack={true}
      />

      <View style={styles.filterBar}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[styles.filterTab, activeFilter === filter.key && styles.activeFilterTab]}
            onPress={() => setActiveFilter(filter.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterText, activeFilter === filter.key && styles.activeFilterText]}>
              {filter.label}
            </Text>
            <View style={[styles.filterBadge, activeFilter === filter.key && styles.activeFilterBadge]}>
              <Text style={[styles.filterBadgeText, activeFilter === filter.key && styles.activeFilterBadgeText]}>
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredAssignments}
        renderItem={renderAssignment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.assignmentsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <CheckCircle2 size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptySubtitle}>
              {activeFilter === 'all' 
                ? "You don't have any assigned tasks right now"
                : `No tasks match the "${filters.find(f => f.key === activeFilter)?.label}" filter`
              }
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  activeFilterTab: {
    backgroundColor: '#eff6ff',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginRight: 6,
  },
  activeFilterText: {
    color: '#3B82F6',
  },
  filterBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeFilterBadge: {
    backgroundColor: '#3B82F6',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeFilterBadgeText: {
    color: '#ffffff',
  },
  assignmentsList: {
    padding: 20,
  },
  assignmentCard: {
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
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusIndicator: {
    marginRight: 12,
    marginTop: 2,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  listTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  priorityBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  assignmentMeta: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
});