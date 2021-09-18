import { useEffect } from 'react'
import { useRouter } from "next/router";

import { isGaIdExists, pageview } from '../lib/gtag'

export default function usePageView() {
  const router = useRouter()

  useEffect(() => {
    if (!isGaIdExists) {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}