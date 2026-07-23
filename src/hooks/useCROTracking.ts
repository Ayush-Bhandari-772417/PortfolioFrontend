// // frontend2\src\hooks\useCROTracking.ts
// 'use client';

// import { useEffect, useCallback, useRef } from 'react';

// interface CROPayload {
//   event_type: string;
//   goal_id?: number;
//   session_id: string;
//   url: string;
//   referrer: string;
//   value?: number | null;
//   metadata?: Record<string, any>;
//   user_agent: string;
// }


// const SESSION_KEY = 'cro_session_id';
// const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/seo/track/`;

// function getSessionId(): string {
//   if (typeof window === 'undefined') return '';

//   let sessionId = sessionStorage.getItem(SESSION_KEY);
//   if (!sessionId) {
//     sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//     sessionStorage.setItem(SESSION_KEY, sessionId);
//   }
//   return sessionId;
// }

// function sendEvent(payload: CROPayload) {
//   if (typeof navigator === 'undefined') return;

//   // payload is provided by caller
//   payload.session_id = getSessionId();
//   payload.url = window.location.href;
//   payload.referrer = document.referrer;
//   payload.user_agent = navigator.userAgent;
//   payload.value = payload.value ?? null;
//   payload.metadata = payload.metadata || {};

//   try {
//     // Use the pre-constructed API_ENDPOINT
//     const endpointUrl = `${API_ENDPOINT}`;

//     if (navigator.sendBeacon) {
//       const blob = new Blob(
//         [JSON.stringify(payload)],
//         { type: "application/json" }
//       );
//       navigator.sendBeacon(endpointUrl, blob);
//     } else {
//       fetch(endpointUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//         keepalive: true,
//       }).catch(() => {});
//     }
//   } catch {
//     // Silently fail - tracking should never break the app
//   }
// }

// export function useCROTracking() {
//   const startedAtRef = useRef<number>(Date.now());
//   const lastScrollPercentRef = useRef<number>(-1);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     // pageview
//     sendEvent({
//       event_type: 'pageview',
//       session_id: '',
//       url: '',
//       referrer: '',
//       value: 1,
//       metadata: {},
//       user_agent: '',
//     });

//     const onScroll = () => {
//       const scrollPercent =
//         (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

//       // avoid spamming: only send when percent changes by >= 1
//       const rounded = Math.floor(scrollPercent);
//       if (rounded === Math.floor(lastScrollPercentRef.current)) return;
//       lastScrollPercentRef.current = scrollPercent;

//       sendEvent({
//         event_type: 'scroll',
//         session_id: '',
//         url: '',
//         referrer: '',
//         value: scrollPercent,
//         metadata: { percentage: scrollPercent },
//         user_agent: '',
//       });
//     };

//     const onVisibility = () => {
//       const seconds = (Date.now() - startedAtRef.current) / 1000;
//       if (!Number.isFinite(seconds)) return;

//       sendEvent({
//         event_type: 'time',
//         session_id: '',
//         url: '',
//         referrer: '',
//         value: seconds,
//         metadata: { seconds },
//         user_agent: '',
//       });
//     };

//     const onClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       const el = target.closest('a, button, input[type="submit"], form');

//       // download
//       const anchor = (el && el instanceof HTMLAnchorElement) ? el : (target.closest('a') as HTMLAnchorElement | null);
//       if (anchor?.href) {
//         const hrefLower = anchor.href.toLowerCase();
//         if (hrefLower.match(/\.(pdf|zip|doc|docx|xls|xlsx|ppt|pptx)(\?.*)?$/)) {
//           sendEvent({
//             event_type: 'download',
//             session_id: '',
//             url: '',
//             referrer: '',
//             value: 1,
//             metadata: { file: anchor.href },
//             user_agent: '',
//           });
//         }

//         // external click
//         try {
//           const u = new URL(anchor.href);
//           if (u.hostname !== window.location.hostname) {
//             sendEvent({
//               event_type: 'external_click',
//               session_id: '',
//               url: '',
//               referrer: '',
//               value: 1,
//               metadata: { url: anchor.href, domain: u.hostname },
//               user_agent: '',
//             });
//           }
//         } catch {
//           // ignore invalid URLs
//         }
//       }

//       sendEvent({
//         event_type: 'click',
//         session_id: '',
//         url: '',
//         referrer: '',
//         value: 1,
//         metadata: { selector: (target as any)?.outerHTML ? undefined : undefined },
//         user_agent: '',
//       });
//     };

//     const onSubmit = () => {
//       sendEvent({
//         event_type: 'submit',
//         session_id: '',
//         url: '',
//         referrer: '',
//         value: 1,
//         metadata: {},
//         user_agent: '',
//       });
//     };

//     window.addEventListener('scroll', onScroll, { passive: true });
//     window.addEventListener('beforeunload', onVisibility);
//     document.addEventListener('visibilitychange', onVisibility);
//     document.addEventListener('click', onClick);
//     document.addEventListener('submit', onSubmit);

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('beforeunload', onVisibility);
//       document.removeEventListener('visibilitychange', onVisibility);
//       document.removeEventListener('click', onClick);
//       document.removeEventListener('submit', onSubmit);
//     };
//   }, []);

//   return {};
// }

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ALLOWED_HOSTS =
  (process.env.NEXT_PUBLIC_ANALYTICS_HOST ?? "")
    .split(",")
    .map(h => h.trim())
    .filter(Boolean);

function analyticsEnabled() {
  if (typeof window === "undefined") return false;

  return ALLOWED_HOSTS.includes(window.location.hostname);
}

interface CROPayload {
  goal_id?: number;
  event_type:
    | 'page_view'
    | 'click'
    | 'cta_click'
    | 'project_view'
    | 'scroll'
    | 'time'
    | 'form_submit'
    | 'download'
    | 'outbound_link';
  event_name?: string;
  numeric_value?: number | null;
  session_id: string;
  path: string;
  referrer: string;
  metadata?: Record<string, unknown>;
  user_agent: string;
  hostname: string;
}

const SESSION_KEY = 'cro_session_id';

const API_ENDPOINT =
  `${process.env.NEXT_PUBLIC_API_URL}/seo/track/`;

function getSessionId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function sendEvent(
  payload: { event_type: CROPayload["event_type"] } & Partial<CROPayload>
) {
  if (!analyticsEnabled()) {
    return;
  }
  if (typeof window === "undefined") {
    return;
  }

  const event: CROPayload = {
    hostname: window.location.hostname,
    goal_id: payload.goal_id,
    event_type: payload.event_type,
    event_name: payload.event_name ?? "",
    numeric_value: payload.numeric_value ?? null,
    session_id: getSessionId(),
    path: payload.path ?? window.location.pathname,
    referrer: payload.referrer ?? document.referrer,
    metadata: payload.metadata ?? {},
    user_agent: navigator.userAgent,
  };

  try {
    const body = JSON.stringify(event);
    if (navigator.sendBeacon) {
      const blob = new Blob(
        [body],
        {
          type: "application/json",
        }
      );

      if (navigator.sendBeacon(API_ENDPOINT, blob)) {
        return;
      }
    }

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {"Content-Type": "application/json", },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics should never break the UI.
  }
}

export function useCROTracking() {
  const pathname = usePathname();

  /**
   * Timestamp when the current page was entered.
   */
  const startedAtRef = useRef<number>(Date.now());

  /**
   * Highest scroll percentage reached.
   */
  const maxScrollRef = useRef<number>(0);

  /**
   * Prevent duplicate exit events.
   */
  const hasSentExitEventsRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") { return; }

    /**
     * Reset state for this page.
     */
    startedAtRef.current = Date.now();
    maxScrollRef.current = 0;
    hasSentExitEventsRef.current = false;

    /**
     * Record one page view.
     */
    sendEvent({
      event_type: "page_view",
    });
    /**
     * Update maximum scroll percentage reached.
     * No request is sent here.
     */
    const onScroll = () => {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    
      if (documentHeight <= 0) {
        return;
      }
    
      const scrollPercent = Math.min( 100, Math.max( 0, (window.scrollY / documentHeight) * 100 ));
      
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
      }
    };

    /**
    * Send final scroll/time events once.
    */
    const sendExitEvents = () => {
    
      if (hasSentExitEventsRef.current) { return; }
    
      hasSentExitEventsRef.current = true;
      const seconds = Math.round( (Date.now() - startedAtRef.current) / 1000 );
      
      sendEvent({event_type: "scroll", numeric_value: Math.round(maxScrollRef.current),});
      sendEvent({event_type: "time", numeric_value: seconds,});
    };
    
    /**
    * User changes tab.
    */
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {sendExitEvents();}
    };

    /**
    * Preferred event.
    */
    const onPageHide = () => { sendExitEvents(); };

    /**
    * Older browsers.
    */
    const onBeforeUnload = () => { sendExitEvents(); };

    window.addEventListener("scroll", onScroll, { passive: true, });
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      sendExitEvents();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pathname]);

  return {};
}