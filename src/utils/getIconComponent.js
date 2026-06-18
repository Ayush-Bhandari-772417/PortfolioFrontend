// frontend2\src\utils\getIconComponent.js
"use client";
import React, { useState, useLayoutEffect, useCallback } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from "react-icons/tb";

// Map the library prefix to the imported module
export const iconLibraries = {
  Fa: FaIcons,
  Si: SiIcons,
  Ai: AiIcons,
  Tb: TbIcons,
};

// Map the library prefix to its full name (optional, for better error messages)
export const libraryNames = {
  Fa: 'Font Awesome',
  Si: 'Simple Icons',
  Ai: 'Ant Design Icons',
  Tb: 'Tabler Icons',
};

// Cache for successfully loaded icons to prevent redundant lookups
// We cache the icon component functions, not instances
const iconCache = new Map();

const DynamicIcon = ({ name, ...props }) => {
  const [Icon, setIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized lookup function that returns a function returning the icon JSX
  const lookupIcon = useCallback((iconName) => {
    if (!iconName) return null;

    // Check cache first
    if (iconCache.has(iconName)) {
      return iconCache.get(iconName);
    }

    // Use a regular expression to extract the library prefix (e.g., 'Fa', 'Si')
    const prefix = iconName.match(/[A-Z][a-z]*/g);

    if (prefix && prefix.length > 0) {
      const libraryPrefix = prefix[0];
      const library = iconLibraries[libraryPrefix];

      if (library) {
        const component = library[iconName];
        if (component) {
          // Cache a function that returns the icon JSX (matching original pattern)
          const iconFactory = () => component;
          iconCache.set(iconName, iconFactory);
          return iconFactory;
        } else {
          console.error(`Icon "${iconName}" not found in library "${libraryPrefix}".`);
          // Cache null to prevent repeated lookups for missing icons
          iconCache.set(iconName, null);
          return null;
        }
      } else {
        console.error(`Icon library for prefix "${libraryPrefix}" not found.`);
        // Cache null to prevent repeated lookups
        iconCache.set(iconName, null);
        return null;
      }
    } else {
      console.error(`Could not determine icon library from name "${iconName}".`);
      // Cache null to prevent repeated lookups
      iconCache.set(iconName, null);
      return null;
    }
  }, []);

  useLayoutEffect(() => {
    // Reset state when name changes
    setIsLoading(true);
    setIcon(null);

    // Perform icon lookup
    const foundIcon = lookupIcon(name);

    if (foundIcon) {
      setIcon(foundIcon);
    } else {
      setIcon(null); // Will show placeholder
    }

    setIsLoading(false);
  }, [name, lookupIcon]);

  // Render placeholder while loading or if icon not found
  if (isLoading || !Icon) {
    // Calculate approximate size based on common props
    // Default to 1em x 1em if no size props provided, otherwise use props
    const size = props.fontSize || props.size || '1em';
    return (
      <span
        {...props}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          lineHeight: 0,
          // Add subtle visual placeholder to maintain layout
          visibility: 'hidden',
        }}
        aria-hidden="true"
      />
    );
  }

  return <Icon {...props} />;
};

export default DynamicIcon;