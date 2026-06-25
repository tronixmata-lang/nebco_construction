import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig, RuntimeCaching } from "serwist";
import { Serwist, NetworkFirst } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Injected at build time by Serwist with the list of assets to precache.
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const uploadCache: RuntimeCaching = {
  matcher: ({ url }) => url.pathname.startsWith("/uploads/"),
  handler: new NetworkFirst({
    cacheName: "cms-uploads",
    networkTimeoutSeconds: 10,
  }),
};

const serwist = new Serwist({
  // Precache the build output (HTML, JS, CSS) so the app shell works offline.
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  // Use the browser's navigation preload to speed up first navigations.
  navigationPreload: true,
  // Sensible runtime caching strategies for pages, images, fonts, and APIs.
  // Tuned for poor/intermittent networks: serve cached content fast, then
  // update in the background where it's safe to do so.
  runtimeCaching: [uploadCache, ...defaultCache],
  // When a navigation fails completely (fully offline + not precached),
  // fall back to the cached home page so the user never sees a dead screen.
  fallbacks: {
    entries: [
      {
        url: "/",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
