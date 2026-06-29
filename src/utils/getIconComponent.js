// frontend2\src\utils\getIconComponent.js
"use client";
import React, { useState, useLayoutEffect, useCallback } from 'react';

// ✅ Only loaded when a matching icon is actually needed
const libraryLoaders = {
  Fa: () => import('react-icons/fa'),
  Si: () => import('react-icons/si'),
  Ai: () => import('react-icons/ai'),
  Tb: () => import('react-icons/tb'),
};

export const libraryNames = {
  Fa: 'Font Awesome',
  Si: 'Simple Icons',
  Ai: 'Ant Design Icons',
  Tb: 'Tabler Icons',
};

const iconCache = new Map();

const DynamicIcon = ({ name, ...props }) => {
  const [Icon, setIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const lookupIcon = useCallback(async (iconName) => {
    if (!iconName) return null;

    if (iconCache.has(iconName)) {
      return iconCache.get(iconName);
    }

    const prefix = iconName.match(/[A-Z][a-z]*/g);
    if (!prefix || prefix.length === 0) {
      console.error(`Could not determine icon library from name "${iconName}".`);
      iconCache.set(iconName, null);
      return null;
    }

    const libraryPrefix = prefix[0];
    const loader = libraryLoaders[libraryPrefix];

    if (!loader) {
      console.error(`Icon library for prefix "${libraryPrefix}" not found.`);
      iconCache.set(iconName, null);
      return null;
    }

    try {
      // ✅ Only this specific library loads, only when first needed
      const library = await loader();
      const component = library[iconName];

      if (component) {
        const iconFactory = () => component;
        iconCache.set(iconName, iconFactory);
        return iconFactory;
      } else {
        console.error(`Icon "${iconName}" not found in library "${libraryPrefix}".`);
        iconCache.set(iconName, null);
        return null;
      }
    } catch (err) {
      console.error(`Failed to load icon library for "${iconName}":`, err);
      iconCache.set(iconName, null);
      return null;
    }
  }, []);

  useLayoutEffect(() => {
    setIsLoading(true);
    setIcon(null);

    lookupIcon(name).then((foundIcon) => {
      setIcon(foundIcon ?? null);
      setIsLoading(false);
    });
  }, [name, lookupIcon]);

  if (isLoading || !Icon) {
    const size = props.fontSize || props.size || '1em';
    return (
      <span
        {...props}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          lineHeight: 0,
          visibility: 'hidden',
        }}
        aria-hidden="true"
      />
    );
  }

  return <Icon {...props} />;
};

export default DynamicIcon;