export interface ExternalOrg {
  id: string;
  name: string;
  domain: string;
  connectedAt: Date;
  status: 'active' | 'pending' | 'disconnected';
  channelCount: number;
  dmCount: number;
  permissions: OrgPermissions;
}

export interface OrgPermissions {
  canInviteToChannels: boolean;
  canCreateDMs: boolean;
  canShareFiles: boolean;
  canUseApps: boolean;
  canUseWorkflows: boolean;
}

export interface ConnectionInvite {
  id: string;
  fromOrg: string;
  toOrg: string;
  type: 'channel' | 'dm';
  channelId?: string;
  message?: string;
  permissions: InvitePermissions;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

export interface InvitePermissions {
  canPost: boolean;
  canInviteOthers: boolean;
  canManageChannel: boolean;
}