import { Event } from '../types/GoogleAnalytics/Event'

export const GA_TRACKING_ID = 'UA-131793403-5'

// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics-amp/lib/gtag.js
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}


// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Event) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value,
  })
}

