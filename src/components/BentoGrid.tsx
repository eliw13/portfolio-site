'use client';

import { Column, Row, Heading, Text, Icon, SmartLink } from '@once-ui-system/core';
import { ReactNode } from 'react';

interface BentoCardProps {
  name: string;
  description: string;
  href: string;
  cta: string;
  icon: string;
  background?: ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function BentoCard({
  name,
  description,
  href,
  cta,
  icon,
  background,
  size = 'medium',
}: BentoCardProps) {
  const sizeStyles = {
    small: { gridColumn: 'span 1', minHeight: '250px' },
    medium: { gridColumn: 'span 1', minHeight: '350px' },
    large: { gridColumn: 'span 2', minHeight: '350px' },
  };

  return (
    <SmartLink
      href={href}
      style={{
        textDecoration: 'none',
        display: 'block',
        ...sizeStyles[size],
      }}
    >
      <Column
        fillWidth
        fillHeight
        position="relative"
        radius="l"
        border="neutral-medium"
        background="surface"
        padding="l"
        gap="m"
        style={{
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Background */}
        {background && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          >
            {background}
          </div>
        )}

        {/* Content */}
        <Column fillWidth fillHeight vertical="end" gap="m" style={{ zIndex: 1 }}>
          <Column gap="s">
            <Icon name={icon as any} size="xl" onBackground="neutral-strong" />
            <Heading as="h3" variant="heading-strong-l">
              {name}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {description}
            </Text>
          </Column>
          
          <Row gap="4" vertical="center">
            <Text variant="label-default-s" onBackground="brand-medium">
              {cta}
            </Text>
            <Icon name="arrowRight" size="s" onBackground="brand-medium" />
          </Row>
        </Column>
      </Column>
    </SmartLink>
  );
}

interface BentoGridProps {
  children: ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
