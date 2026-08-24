/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace Cloudflare {
  interface Env {
    DIARY_API_TOKEN?: string
    HEALTH_AUTO_EXPORT_TOKEN?: string
  }
}
