'use client';

import { useEffect, useState } from 'react';
import { Row, Column, Avatar, Text, Icon } from '@once-ui-system/core';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
}

export default function GitHubPresence({ username }: { username: string }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data: GitHubUser = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching GitHub user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading || !user) {
    return null;
  }

  return (
    <a
      href={user.html_url}
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
            <Avatar src={user.avatar_url} size="m" />
            <Column gap="4">
              <Text variant="label-default-s" weight="strong">
                GITHUB
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                @{user.login}
              </Text>
            </Column>
          </Row>
          <Icon 
            name="chevronRight" 
            onBackground="neutral-weak"
            style={{
              color: isHovered ? '#238636' : undefined,
              transition: 'color 0.2s ease',
            }}
          />
        </Row>
      </Column>
    </a>
  );
}
