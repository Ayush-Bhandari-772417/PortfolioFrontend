// frontend2\src\telemetry\core\TelemetryBus.ts
type TelemetryEvent =
  | 'page_view'
  | 'scroll_depth'
  | 'engagement_time'
  | 'web_vital'
  | 'custom';

type TelemetryPayload = Record<string, any>;

class TelemetryBus {
  private static instance: TelemetryBus;
  private listeners: Map<TelemetryEvent, Set<(payload: any) => void>> = new Map();

  static getInstance() {
    if (!this.instance) this.instance = new TelemetryBus();
    return this.instance;
  }

  on(event: TelemetryEvent, handler: (payload: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: TelemetryEvent, handler: (payload: any) => void) {
    this.listeners.get(event)?.delete(handler);
  }

  emit(event: TelemetryEvent, payload?: TelemetryPayload) {
    this.listeners.get(event)?.forEach((h) => h(payload));
  }
}

export const Telemetry = TelemetryBus.getInstance();