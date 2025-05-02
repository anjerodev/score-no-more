import {
  PLAYER_TITLE_SELECTOR,
  SCORE_KEYWORDS,
  SCORE_REGEX,
  THUMBNAIL_SELECTORS,
  TITLE_SELECTORS,
  VIDEO_SELECTORS,
} from '@/lib/constants'
import { $, $$, hideThumbnail, updateTitle } from '@/lib/utils/dom'

// Jump video forward because sometimes they show the result at the beginning of the video
// TODO: Make the seconds jump forward value configurable
function jumpVideoForward(seconds: number = 15): void {
  // Select the main video player element on the page
  const videoElement = document.querySelector(
    'video'
  ) as HTMLVideoElement | null

  if (!videoElement) return

  // Check if currentTime and duration are finite numbers
  if (
    !Number.isFinite(videoElement.currentTime) ||
    !Number.isFinite(videoElement.duration)
  )
    return

  if (videoElement.currentTime < seconds) {
    const diff = seconds - videoElement.currentTime
    // Ensure the new time doesn't exceed the video duration
    const newTime = Math.min(
      videoElement.currentTime + diff,
      videoElement.duration
    )
    videoElement.currentTime = newTime
  }

  videoElement.style.filter = 'inherit'
}

function checkTextForKeywords(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase()
  return keywords.some((keyword) => lowerText.includes(keyword.toLowerCase()))
}

function checkForSpoiler(text: string): boolean {
  const hasScore = SCORE_REGEX.test(text)
  const hasKeyword = checkTextForKeywords(text, SCORE_KEYWORDS)
  return hasScore || hasKeyword
}

export function removeScores(text: string): string {
  const cleanedText = text.replace(SCORE_REGEX, '-')
  return cleanedText
}

function processPotentialSpoiler(
  titleElement: HTMLElement,
  keywords: string[],
  thumbnailElement?: HTMLImageElement | null
) {
  const textContent = titleElement.textContent
  const ariaLabelTitle = titleElement.getAttribute('aria-label')
  const titleAttribute = titleElement.getAttribute('title')

  const originalTitle = titleAttribute ?? ariaLabelTitle ?? textContent

  if (!originalTitle) return

  const hasKeywords = checkTextForKeywords(originalTitle, keywords)
  const hasSpoiler = checkForSpoiler(originalTitle)

  if (hasKeywords && hasSpoiler) {
    if (thumbnailElement) hideThumbnail(thumbnailElement)
    updateTitle(titleElement, originalTitle)

    // Check if this is the player title and jump forward if it is
    if (titleElement.matches(PLAYER_TITLE_SELECTOR)) {
      jumpVideoForward()
    }
  } else {
    if (originalTitle !== textContent) {
      titleElement.textContent = originalTitle
      if (thumbnailElement) {
        const thumbnailParent = thumbnailElement.parentElement
        if (thumbnailParent) {
          thumbnailParent.classList.remove('pixelated')
        }
      }
    }

    if (titleElement.matches(PLAYER_TITLE_SELECTOR)) {
      const videoElement = document.querySelector('video') as HTMLVideoElement
      if (videoElement) {
        videoElement.style.filter = 'inherit'
      }
    }
  }
}

function processVideoContainer(titleEl: HTMLElement, keywords: string[]) {
  const container = titleEl.closest(
    VIDEO_SELECTORS.join(',')
  ) as HTMLElement | null
  let thumbnailElement: HTMLImageElement | null = null

  if (container) {
    thumbnailElement = $(
      THUMBNAIL_SELECTORS.join(','),
      container
    ) as HTMLImageElement | null
  }

  processPotentialSpoiler(titleEl, keywords, thumbnailElement)
}

// Initial scanning of the page
function observeVideosInDOM(keywords: string[]) {
  const titlesElements = $$(TITLE_SELECTORS.join(','))
  titlesElements.forEach((titleEl) => {
    processVideoContainer(titleEl, keywords)
  })
}

function observeDOMChanges(keywords: string[]): MutationObserver[] | null {
  const observers: MutationObserver[] = []

  const domObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof Element) {
            // Check if the added node is a title container element
            const titleElement = node.querySelector(
              TITLE_SELECTORS.join(',')
            ) as HTMLElement | null

            if (titleElement) {
              processVideoContainer(titleElement, keywords)
            }
          }
        }
      }

      if (
        mutation.type === 'attributes' &&
        mutation.target instanceof HTMLElement &&
        mutation.target.hasAttribute('title') &&
        mutation.attributeName === 'title'
      ) {
        const targetElement = mutation.target

        if (targetElement.matches(TITLE_SELECTORS.join(','))) {
          processVideoContainer(targetElement, keywords)
        }
      }
    }
  })

  // Observer specifically for the <title> element changes
  const titleObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Check if the text content of the title node changed
      if (
        mutation.type === 'childList' &&
        mutation.target === document.querySelector('title')
      ) {
        const currentTitle = document.title
        const hasKeywords = checkTextForKeywords(currentTitle, keywords)
        const hasSpoiler = checkForSpoiler(currentTitle)

        if (hasKeywords && hasSpoiler) {
          const newTitle = removeScores(currentTitle)
          if (document.title !== newTitle) {
            document.title = newTitle // Re-apply the cleaned title
          }
        }
      }
    }
  })

  const appContainer = $('ytd-app')
  const headTitle = document.querySelector('head title')

  if (headTitle) {
    titleObserver.observe(headTitle, {
      childList: true, // Observe changes to the text node inside <title>
    })
    observers.push(titleObserver)
  }
  if (appContainer) {
    domObserver.observe(appContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['title'],
    })
    observers.push(domObserver)
  }

  return observers // Return the observer instance
}

export { observeVideosInDOM, observeDOMChanges }
