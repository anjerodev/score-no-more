import { PROCESSED_ATTR } from '@/lib/constants'

export function $<T extends HTMLElement>(
  selector: string,
  node: Document | HTMLElement = document
): T | null {
  return node.querySelector(selector)
}

export function $$<T extends HTMLElement>(
  selector: string,
  node: Document | HTMLElement = document
): NodeListOf<T> {
  return node.querySelectorAll(selector)
}

function createSpoilerPlaceholder(): HTMLDivElement {
  const placeholder = document.createElement('div')
  placeholder.setAttribute('data-spoiler-placeholder', 'true')
  placeholder.classList.add('spoiler-placeholder')
  return placeholder
}

function createSpoilerBubble(): HTMLDivElement {
  const bubble = document.createElement('div')
  bubble.classList.add('spoiler-bubble')
  bubble.textContent = 'Spoiler'
  return bubble
}

export function hideThumbnail(thumbnailElement: HTMLImageElement): void {
  if (!thumbnailElement.hasAttribute(PROCESSED_ATTR)) {
    const placeholder = createSpoilerPlaceholder()
    const bubble = createSpoilerBubble()

    thumbnailElement.style.position = 'relative'
    thumbnailElement.style.overflow = 'hidden'
    thumbnailElement.setAttribute(PROCESSED_ATTR, 'true')

    const thumbnailParent = thumbnailElement.parentElement
    if (thumbnailParent) {
      thumbnailParent.classList.add('pixelated')
      thumbnailParent.appendChild(placeholder)
      thumbnailParent.appendChild(bubble)
    }
  }
}

export function updateTitle(
  titleElement: HTMLHeadingElement,
  newText: string,
  originalTitle: string
): void {
  if (!titleElement.hasAttribute(PROCESSED_ATTR)) {
    titleElement.textContent = newText
    titleElement.setAttribute(PROCESSED_ATTR, 'true')
    titleElement.setAttribute('original-title', originalTitle)
  }
}

export function countHiddenSpoilersOnDocument(): number {
  const hiddenElements = $$('[data-spoiler-placeholder]')
  return hiddenElements.length
}
