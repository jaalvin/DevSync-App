import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Link2, Building, Users, MessageCircle, Clock, CircleCheck as CheckCircle2, Circle as XCircle, Settings, ChevronRight } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { ExternalOrg, ConnectionInvite } from '@/types/connections';

const mockOrgs: ExternalOrg[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    domain: 'acme.com',
    connectedAt: new Date('2024-01-10'),
    status: 'active',
    channelCount: 3,
    dmCount: 5,
    permissions: {
      canInviteToChannels: true,
      canCreateDMs: true,
      canShareFiles: true,
      canUseApps: false,
      canUseWorkflows: false,
    },
  },
  {
    id: '2',
    name: 'Tech Partners Inc.',
    domain: 'techpartners.com',
    connectedAt: new Date('2024-01-12'),
    status: 'active',
    channelCount: 1,
    dmCount: 2,
    permissions: {
      canInviteToChannels: false,
      canCreateDMs: true,
      canShareFiles: true,
      canUseApps: true,
      canUseWorkflows: true,
    },
  },
];

const mockInvites: ConnectionInvite[] = [
  {
    id: '1',
    fromOrg: 'Global Solutions Ltd',
    toOrg: 'Your Organization',
    type: 'channel',
    channelId: 'general',
    message: 'Join our collaboration channel for the Q1 project',
    permissions: { canPost: true, canInviteOthers: false, canManageChannel: false },
    status: 'pending',
    createdAt: new Date('2024-01-16'),
    expiresAt: new Date('2024-01-23'),
  },
  {
    id: '2',
    fromOrg: 'StartupX',
    toOrg: 'Your Organization',
    type: 'dm',
    message: 'Let\'s discuss potential partnership opportunities',
    permissions: { canPost: true, canInviteOthers: false, canManageChannel: false },
    status: 'pending',
    createdAt: new Date('2024-01-15'),
    expiresAt: new Date('2024-01-22'),
  },
];

export default function ExternalConnections() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'connected' | 'invites'>('connected');

  const handleInviteAction = (invite: ConnectionInvite, action: 'accept' | 'decline') => {
    Alert.alert(
      action === 'accept' ? 'Accept Invite' : 'Decline Invite',
      `${action === 'accept' ? 'Accept' : 'Decline'} invitation from ${invite.fromOrg}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: action === 'accept' ? 'Accept' : 'Decline',
          style: action === 'accept' ? 'default' : 'destructive',
          onPress: () => {
            // Handle invite action
          }
        },
      ]
    );
  };

  const renderOrg = ({ item }: { item: ExternalOrg }) => (
    <TouchableOpacity
      style={styles.orgCard}
      onPress={() => router.push(`/more/connections/${item.id}` as any)}
      activeOpacity={0.7}
    >
      <View style={styles.orgHeader}>
        <View style={styles.orgIcon}>
          <Building size={20} color="#3B82F6" />
        </View>
        <View style={styles.orgInfo}>
          <Text style={styles.orgName}>{item.name}</Text>
          <Text style={styles.orgDomain}>{item.domain}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#10B981' : '#6B7280' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orgStats}>
        <View style={styles.stat}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.statText}>{item.channelCount} channels</Text>
        </View>
        <View style={styles.stat}>
          <MessageCircle size={16} color="#6B7280" />
          <Text style={styles.statText}>{item.dmCount} DMs</Text>
        </View>
      </View>

      <View style={styles.orgFooter}>
        <Text style={styles.connectedAt}>
          Connected {item.connectedAt.toLocaleDateString()}
        </Text>
        <View style={styles.orgActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={16} color="#6B7280" />
          </TouchableOpacity>
          <ChevronRight size={16} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderInvite = ({ item }: { item: ConnectionInvite }) => (
    <View style={styles.inviteCard}>
      <View style={styles.inviteHeader}>
        <View style={styles.inviteIcon}>
          <Link2 size={20} color="#F59E0B" />
        </View>
        <View style={styles.inviteInfo}>
          <Text style={styles.inviteFrom}>{item.fromOrg}</Text>
          <Text style={styles.inviteType}>
            {item.type === 'channel' ? 'Channel invitation' : 'Direct message'}
          </Text>
        </View>
        <View style={styles.inviteTime}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.inviteTimeText}>
            {Math.ceil((item.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d left
          </Text>
        </View>
      </View>

      {item.message && (
        <Text style={styles.inviteMessage}>{item.message}</Text>
      )}

      <View style={styles.inviteActions}>
        <TouchableOpacity
          style={[styles.inviteActionButton, styles.declineButton]}
          onPress={() => handleInviteAction(item, 'decline')}
          activeOpacity={0.7}
        >
          <XCircle size={16} color="#EF4444" />
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inviteActionButton, styles.acceptButton]}
          onPress={() => handleInviteAction(item, 'accept')}
          activeOpacity={0.7}
        >
          <CheckCircle2 size={16} color="#ffffff" />
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="External connections"
        subtitle={`${activeTab === 'connected' ? mockOrgs.length : mockInvites.length} ${activeTab === 'connected' ? 'organizations' : 'pending invites'}`}
        showBack={true}
      />

      <View style={styles.tabBar}>
        {[
          { key: 'connected', label: 'Connected', count: mockOrgs.length },
          { key: 'invites', label: 'Invites', count: mockInvites.length },
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
            {tab.count > 0 && (
              <View style={[styles.tabBadge, activeTab === tab.key && styles.activeTabBadge]}>
                <Text style={[styles.tabBadgeText, activeTab === tab.key && styles.activeTabBadgeText]}>
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={activeTab === 'connected' ? mockOrgs : mockInvites}
        renderItem={activeTab === 'connected' ? renderOrg : renderInvite}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {activeTab === 'connected' ? (
              <Building size={48} color="#D1D5DB" />
            ) : (
              <Link2 size={48} color="#D1D5DB" />
            )}
            <Text style={styles.emptyTitle}>
              {activeTab === 'connected' ? 'No connections' : 'No pending invites'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'connected' 
                ? "You haven't connected to any external organizations yet"
                : "You don't have any pending connection invites"
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
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
  tabBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  activeTabBadge: {
    backgroundColor: '#3B82F6',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabBadgeText: {
    color: '#ffffff',
  },
  contentList: {
    padding: 20,
  },
  orgCard: {
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
  orgHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orgIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orgInfo: {
    flex: 1,
  },
  orgName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  orgDomain: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  orgStats: {
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
  orgFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  connectedAt: {
    fontSize: 12,
    color: '#9ca3af',
  },
  orgActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginRight: 8,
  },
  inviteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  inviteIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inviteInfo: {
    flex: 1,
  },
  inviteFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  inviteType: {
    fontSize: 14,
    color: '#6b7280',
  },
  inviteTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteTimeText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  inviteMessage: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  inviteActions: {
    flexDirection: 'row',
    gap: 8,
  },
  inviteActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
  },
  declineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 6,
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
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