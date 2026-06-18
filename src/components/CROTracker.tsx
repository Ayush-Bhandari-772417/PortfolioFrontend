'use client';

import { useCROTracking } from '@/hooks/useCROTracking';

/**
 * CRO Tracker Component
 * 
 * Place this component in your layout.tsx to enable CRO tracking
 * across all pages. It loads goals from the backend and sets up
 * event listeners automatically.
 * 
 * Usage:
 * import CROTracker from '@/components/CROTracker';
 * 
 * // In layout.tsx:
 * <CROTracker />
 */
export default function CROTracker() {
  useCROTracking();
  return null; // This component renders nothing
}
