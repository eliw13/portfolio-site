'use client';

import React from 'react';
import { GlassSurface } from '@/components';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 's' | 'm' | 'l';
  fullWidth?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'm',
  fullWidth = false,
}) => {
  const sizeStyles = {
    s: { height: 36, borderRadius: 12, padding: '8px 16px' },
    m: { height: 44, borderRadius: 14, padding: '10px 20px' },
    l: { height: 52, borderRadius: 16, padding: '12px 24px' },
  };

  const variantStyles = {
    primary: {
      brightness: 65,
      opacity: 0.9,
      backgroundOpacity: 0.2,
      saturation: 1.5,
    },
    secondary: {
      brightness: 55,
      opacity: 0.85,
      backgroundOpacity: 0.1,
      saturation: 1.3,
    },
  };

  const { height, borderRadius, padding } = sizeStyles[size];
  const glassProps = variantStyles[variant];

  const content = (
    <GlassSurface
      width={fullWidth ? '100%' : 'auto'}
      height={height}
      borderRadius={borderRadius}
      brightness={glassProps.brightness}
      opacity={glassProps.opacity}
      blur={12}
      displace={1.5}
      backgroundOpacity={glassProps.backgroundOpacity}
      saturation={glassProps.saturation}
      distortionScale={-170}
      redOffset={1}
      greenOffset={6}
      blueOffset={12}
      className={`glass-button ${className}`}
      style={{
        padding: 0,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          padding,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </GlassSurface>
  );

  if (href) {
    return (
      <a
        href={href}
        style={{ textDecoration: 'none', display: fullWidth ? 'block' : 'inline-block' }}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{ display: fullWidth ? 'block' : 'inline-block', cursor: onClick ? 'pointer' : 'default' }}
      className={className}
    >
      {content}
    </div>
  );
};
