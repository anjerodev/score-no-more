import { useEffect } from 'preact/hooks'

import { getKeywords } from '@/lib/utils/chrome'

import { observeDOMChanges, observeVideosInDOM } from './helpers'

export function Content() {
  useEffect(() => {
    getKeywords().then((keywords) => {
      if (keywords.length > 0) {
        // console.log('Keywords loaded, starting observation:', keywords)
        // Initial processing of existing videos
        observeVideosInDOM(keywords)

        // Start observing DOM changes
        const observers = observeDOMChanges(keywords)

        // Cleanup function: disconnect the observer when the component unmounts
        return () => {
          if (observers) {
            console.log('Disconnecting MutationObserver...')
            observers.forEach((observer) => {
              observer.disconnect()
            })
          }
        }
      }
    })
  }, [])

  return null
}
