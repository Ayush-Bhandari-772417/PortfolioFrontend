// frontend2\src\hooks\useCROTracking.ts
'use client';

import { useEffect, useCallback, useRef } from 'react';
import { apiFetch } from '@/lib/data';

interface TrackedGoal {
  id: number;
  name: string;
  goal_type: string;
  target_selector?: string;
  target_url?: string;
  target_value?: string;
}

interface TrackingConfig {
  sessionId: string;
  goals: TrackedGoal[];
  enabled: boolean;
}

const SESSION_KEY = 'cro_session_id';
const API_ENDPOINT = '/api/seo/public/track/';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function sendEvent(goal: TrackedGoal, value?: number, metadata?: Record<string, any>) {
  if (typeof navigator === 'undefined') return;

  const payload = {
    goal_id: goal.id,
    session_id: getSessionId(),
    url: window.location.href,
    referrer: document.referrer,
    value: value ?? null,
    metadata: metadata || {},
    user_agent: navigator.userAgent,
  };

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${window.location.origin}${API_ENDPOINT}`, JSON.stringify(payload));
    } else {
      fetch(`${window.location.origin}${API_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silently fail - tracking should never break the app
  }
}

export function useCROTracking() {
  const configRef = useRef<TrackingConfig>({
    sessionId: '',
    goals: [],
    enabled: false,
  });

  const setupTracking = useCallback((goals: TrackedGoal[]) => {
    goals.forEach((goal) => {
      switch (goal.goal_type) {
        case 'click':
          setupClickTracking(goal);
          break;
        case 'submit':
          setupSubmitTracking(goal);
          break;
        case 'scroll':
          setupScrollTracking(goal);
          break;
        case 'time':
          setupTimeTracking(goal);
          break;
        case 'pageview':
          sendEvent(goal, 1, { type: 'pageview' });
          break;
        case 'external_click':
          setupExternalClickTracking(goal);
          break;
        case 'download':
          setupDownloadTracking(goal);
          break;
      }
    });
  }, []);

  // Load active goals from API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    configRef.current.sessionId = getSessionId();

    apiFetch('/api/seo/public/goals/')
      .then((res) => res.json())
      .then((goals: TrackedGoal[]) => {
        configRef.current.goals = goals;
        configRef.current.enabled = goals.length > 0;
        setupTracking(goals);
      })
      .catch(() => {
        // Silently fail - tracking should never break the app
      });
  }, [setupTracking]);

  const track = useCallback(
    (goalId: number, value?: number, metadata?: Record<string, any>) => {
      const goal = configRef.current.goals.find((g) => g.id === goalId);
      if (goal) sendEvent(goal, value, metadata);
    },
    []
  );

  return { track };
}

// Tracking setup functions
function setupClickTracking(goal: TrackedGoal) {
  if (!goal.target_selector) return;

  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.matches(goal.target_selector!) || target.closest(goal.target_selector!)) {
      sendEvent(goal, 1, { type: 'click', selector: goal.target_selector });
    }
  };

  document.addEventListener('click', handler);
}

function setupSubmitTracking(goal: TrackedGoal) {
  if (!goal.target_selector) return;

  const handler = (e: SubmitEvent) => {
    const target = e.target as HTMLFormElement;
    if (target.matches(goal.target_selector!) || target.closest(goal.target_selector!)) {
      sendEvent(goal, 1, { type: 'submit', selector: goal.target_selector });
    }
  };

  document.addEventListener('submit', handler as EventListener);
}

const scrollTracked = new Set<string>();

function setupScrollTracking(goal: TrackedGoal) {
  const threshold = parseInt(goal.target_value || '50', 10);
  const key = `scroll-${goal.id}`;

  const handler = () => {
    if (scrollTracked.has(key)) return;

    const scrollPercent =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent >= threshold) {
      scrollTracked.add(key);
      window.removeEventListener('scroll', handler);
      sendEvent(goal, scrollPercent, { type: 'scroll', percentage: scrollPercent });
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
}

const timeTracked = new Set<string>();

function setupTimeTracking(goal: TrackedGoal) {
  const seconds = parseInt(goal.target_value || '30', 10) * 1000;
  const key = `time-${goal.id}`;

  setTimeout(() => {
    if (!timeTracked.has(key)) {
      timeTracked.add(key);
      sendEvent(goal, seconds / 1000, { type: 'time', seconds: seconds / 1000 });
    }
  }, seconds);
}

function setupExternalClickTracking(goal: TrackedGoal) {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');

    if (anchor && anchor.hostname !== window.location.hostname) {
      sendEvent(goal, 1, {
        type: 'external_click',
        url: anchor.href,
        domain: anchor.hostname,
      });
    }
  };

  document.addEventListener('click', handler);
}

function setupDownloadTracking(goal: TrackedGoal) {
  const downloadExtensions = ['.pdf', '.zip', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');

    if (!anchor) return;

    const href = anchor.href.toLowerCase();
    if (downloadExtensions.some((ext) => href.endsWith(ext))) {
      sendEvent(goal, 1, { type: 'download', file: anchor.href });
    }
  };

  document.addEventListener('click', handler);
}