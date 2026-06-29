// frontend2\src\telemetry\vendors\VendorLoader.tsx
"use client";

import { useEffect, useState, type ComponentType } from 'react';
import { vendorRegistry } from '@/telemetry/vendors/registry';
import { canLoadVendor, getConsent } from '@/telemetry/core/consent';

export default function VendorLoader() {
  const [components, setComponents] = useState<ComponentType[]>([]);

  useEffect(() => {
    let isMounted = true;
    let lastConsent = getConsent();

    const waitForIdle = () =>
      new Promise<void>((resolve) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => resolve(), { timeout: 2000 });
        } else {
          setTimeout(() => resolve(), 2000);
        }
      });

    const loadAnalytics = async () => {
      await waitForIdle();

      const eligibleVendors = vendorRegistry.filter(
        (vendor) => vendor.enabled && canLoadVendor(vendor.name)
      );

      const modules = await Promise.all(
        eligibleVendors.map(async (vendor) => {
          const mod = await vendor.load();
          return mod.default as ComponentType | null;
        })
      );

      if (!isMounted) return;
      // Narrow the array to ComponentType[] using a type guard
      const validModules = modules.filter((m): m is ComponentType => m !== null && m !== undefined);
      setComponents(validModules);
    };

    loadAnalytics();

    const consentInterval = window.setInterval(async () => {
      const currentConsent = getConsent();
      if (currentConsent !== lastConsent) {
        lastConsent = currentConsent;
        await loadAnalytics();
      }
    }, 2000);

    return () => {
      isMounted = false;
      window.clearInterval(consentInterval);
    };
  }, []);

  return <>{components.map((Comp, idx) => <Comp key={idx} />)}</>;
}