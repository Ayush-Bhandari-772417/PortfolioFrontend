import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

const CANONICAL_HOST = "www.bhandariayush.com.np";
const VERCEL_HOST = "portfolio-frontend-psi-gold.vercel.app";

const AI_CRAWLER_SIGNATURES: Record<string, string> = {
  // OpenAI
  "GPTBot": "gptbot",
  "ChatGPT-User": "chatgpt_user",

  // Anthropic
  "ClaudeBot": "claudebot",
  "Claude-User": "claude_user",

  // Google
  "Googlebot": "googlebot",
  "Google-Extended": "google_extended",
  "GoogleOther": "googleother",

  // Microsoft
  "Bingbot": "bingbot",

  // Perplexity
  "PerplexityBot": "perplexitybot",
  "Perplexity-User": "perplexity_user",

  // Amazon
  "Amazonbot": "amazonbot",

  // Apple
  "Applebot": "applebot",

  // ByteDance
  "Bytespider": "bytespider",

  // Common Crawl
  "CCBot": "ccbot",

  // Others
  "YandexBot": "yandexbot",
  "DuckAssistBot": "duckassistbot",
  "externalhit": "facebookbot",
  "OAI-SearchBot": "oai_searchbot",
};

export function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const host = request.nextUrl.host;
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const userAgent = request.headers.get("user-agent") ?? "";

  let crawler = "other_ai";

  const matched = Object.entries(AI_CRAWLER_SIGNATURES).find(
    ([signature]) =>
      userAgent.toLowerCase().includes(signature.toLowerCase())
  );

  const isAiCrawler = !!matched;

  if (matched) {
    crawler = matched[1];
  }

  const canonical = host === CANONICAL_HOST;

  const isDeploymentHost =
    host === VERCEL_HOST;

  const redirected = isDeploymentHost;

  const redirectReason = redirected
    ? "deployment_host"
    : "";

  if (isAiCrawler) {
    event.waitUntil(
      fetch(`${API_BASE}/public/seo/log-ai-crawler/`, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crawler,
          user_agent: userAgent,
          path: pathname,
          host,
          canonical,
          redirected,
          redirect_reason: redirectReason,
        }),
      }).catch(() => {})
    );
  }

  if (isDeploymentHost) {
    const url = request.nextUrl.clone();

    url.protocol = "https:";
    url.host = CANONICAL_HOST;

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};