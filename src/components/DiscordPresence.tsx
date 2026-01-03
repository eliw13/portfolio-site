'use client';

import { useEffect, useState } from 'react';
import { Row, Column, Avatar, Text, Icon } from '@once-ui-system/core';

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    application_id?: string;
  }>;
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

const statusColors = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
};

const statusLabels = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};

export default function DiscordPresence({ userId }: { userId: string }) {
  const [presence, setPresence] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data: LanyardResponse = await response.json();
        if (data.success) {
          setPresence(data.data);
        }
      } catch (error) {
        console.error('Error fetching Discord presence:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchPresence();

    // Set up WebSocket for real-time updates
    const ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: userId,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.op === 0) {
        setPresence(data.d);
      } else if (data.op === 1) {
        // Heartbeat
        const heartbeatInterval = data.d.heartbeat_interval;
        setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, heartbeatInterval);
      }
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  if (loading || !presence) {
    return null;
  }

  const status = presence.discord_status;
  const activity = presence.activities.find((a) => a.type === 0); // Type 0 is "Playing"
  const customStatus = presence.activities.find((a) => a.type === 4); // Type 4 is custom status

  const getActivityImage = (activity: any) => {
    if (!activity?.assets?.large_image) return null;
    
    // Discord CDN URLs for application assets
    if (activity.application_id && activity.assets.large_image) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
    }
    
    return null;
  };

  return (
    <a
      href={`https://discord.com/users/${userId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <Column
        fillWidth
        padding="12"
        paddingX="16"
        radius="m"
        border="neutral-alpha-weak"
        background="neutral-alpha-weak"
        gap="12"
        style={{
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minWidth: '240px',
          maxWidth: '240px',
        }}
        onMouseEnter={(e) => {
          setIsHovered(true);
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
      <Row fillWidth horizontal="between" vertical="center">
        <Row gap="8" vertical="center">
          <div style={{ position: 'relative' }}>
            <Avatar
              src={`https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.png`}
              size="m"
            />
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: statusColors[status],
                border: '2px solid var(--neutral-0)',
              }}
            />
          </div>
          <Column gap="4">
            <Text variant="label-default-s" weight="strong">
              DISCORD
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {statusLabels[status]}{activity ? ` - ${activity.name}` : ''}
            </Text>
          </Column>
        </Row>
        <Icon 
          name="chevronRight" 
          onBackground="neutral-weak"
          style={{
            color: isHovered ? '#5865F2' : undefined,
            transition: 'color 0.2s ease',
          }}
        />
      </Row>

      {presence.listening_to_spotify && presence.spotify && (
        <Column fillWidth gap="8">
          <Row gap="8" vertical="center">
            <img
              src={presence.spotify.album_art_url}
              alt={presence.spotify.song}
              style={{
                width: 40,
                height: 40,
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
            <Column gap="4" flex={1}>
              <Text variant="label-default-xs" onBackground="neutral-medium">
                Listening to Spotify
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {presence.spotify.song}
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                by {presence.spotify.artist}
              </Text>
            </Column>
          </Row>
        </Column>
      )}
      </Column>
    </a>
  );
}
