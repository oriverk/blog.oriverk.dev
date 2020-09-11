import { Event } from '../Types/GoogleAnalytics/Event'

export const GA_TRACKING_ID = 'UA-131793403-5'
export const existsGaId = true

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url:string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}