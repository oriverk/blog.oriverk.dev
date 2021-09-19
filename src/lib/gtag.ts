import { Event } from '../types/GoogleAnalytics/Event'

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""

export const isGaIdExists = GA_TRACKING_ID !== ""

// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics-amp/lib/gtag.js
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}


// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value = "" }: Event) => {
  if (!isGaIdExists) {
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value,
  })
}

