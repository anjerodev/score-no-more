import {
  SCORE_KEYWORDS,
  SCORE_REGEX,
  THUMBNAIL_SELECTORS,
  VIDEO_SELECTORS,
} from '@/lib/constants'
import { $, $$, hideThumbnail, updateTitle } from '@/lib/utils/dom'

function checkTextForKeywords(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase()
  return keywords.some((keyword) => lowerText.includes(keyword.toLowerCase()))
}

function checkForSpoiler(text: string): boolean {
  const hasScore = SCORE_REGEX.test(text)
  const hasKeyword = checkTextForKeywords(text, SCORE_KEYWORDS)
  return hasScore || hasKeyword
}

function removeScores(text: string): string {
  const cleanedText = text.replace(SCORE_REGEX, '-')
  return cleanedText
}

const hideSpoiler = (node: HTMLElement, keywords: string[]) => {
  const titleElement = $('#video-title', node) as HTMLHeadingElement | null
  const thumbnailElement = $(
    THUMBNAIL_SELECTORS.join(', '),
    node
  ) as HTMLImageElement | null

  if (!titleElement) return

  const titleText = titleElement.textContent
  const originalTitle =
    titleElement.getAttribute('original-title') ?? titleText ?? ''

  const hasKeywords = checkTextForKeywords(originalTitle, keywords)
  const hasSpoiler = checkForSpoiler(originalTitle)

  if (thumbnailElement && hasKeywords && hasSpoiler) {
    hideThumbnail(thumbnailElement)

    const cleanedTitle = removeScores(originalTitle)
    updateTitle(titleElement, cleanedTitle, originalTitle)
  }
}

function observeVideosInDOM(keywords: string[]) {
  const videoElements = $$(VIDEO_SELECTORS.join(', '))
  for (const el of Array.from(videoElements)) {
    hideSpoiler(el as HTMLElement, keywords)
  }
}

function observeDOMChanges(keywords: string[]): MutationObserver | null {
  const mo = new MutationObserver((mutations) => {
    let relevantChange = false
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any added node is NOT the placeholder
        for (const node of Array.from(mutation.addedNodes)) {
          if (
            !(node instanceof Element) ||
            !node.hasAttribute('data-spoiler-placeholder')
          ) {
            relevantChange = true
            break // Found a relevant node, no need to check others in this mutation
          }
        }
      }
      if (relevantChange) {
        break // Found a relevant mutation, no need to check other mutations
      }
    }

    if (relevantChange) {
      console.log('Relevant DOM change detected, re-processing videos...')
      observeVideosInDOM(keywords) // Pass keywords here
    }
  })

  const appContainer = $('ytd-app')
  if (appContainer) {
    mo.observe(appContainer, {
      childList: true,
      subtree: true,
    })
    return mo // Return the observer instance
  }
  return null // Return null if observer couldn't be attached
}

export { observeVideosInDOM, observeDOMChanges }
