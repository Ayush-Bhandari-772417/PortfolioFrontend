'use client';

import { vendorRegistry } from '../vendors/registry';
import { canLoadVendor, getConsent } from './consent';

class TelemetryKernel {
  private loaded = new Set<string>();
  private running = false;

  async start() {
    if (this.running) return;
    this.running = true;

    await this.loadVendors();

    // watch consent changes (v4 feature)
    this.watchConsent();
  }

  private async loadVendors() {
    const consent = getConsent();

    const tasks = vendorRegistry
      .filter(v => v.enabled)
      .filter(v => canLoadVendor(v.name))
      .filter(v => !this.loaded.has(v.name))
      .map(async (v) => {
        const mod = await v.load();
        const Comp = mod.default;

        this.loaded.add(v.name);
        return Comp;
      });

    // PARALLEL execution (v4 improvement over v3 sequential loop)
    await Promise.all(tasks);
  }

  private watchConsent() {
    if (typeof window === 'undefined') return;

    let last = getConsent();

    setInterval(async () => {
      const current = getConsent();

      if (current !== last) {
        last = current;
        await this.loadVendors();
      }
    }, 2000);
  }
}

export const telemetryKernel = new TelemetryKernel();