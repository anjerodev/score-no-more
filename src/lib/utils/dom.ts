import { removeScores } from '@/content/helpers'

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
  const thumbnailParent = thumbnailElement.parentElement

  thumbnailElement.style.backgroundImage = 'none'

  if (thumbnailParent && !$('[data-spoiler-placeholder]', thumbnailParent)) {
    const placeholder = createSpoilerPlaceholder()
    const bubble = createSpoilerBubble()

    thumbnailParent.classList.add('pixelated')
    thumbnailParent.appendChild(placeholder)
    thumbnailParent.appendChild(bubble)
  }
}

export function updateTitle(
  titleElement: HTMLElement,
  originalTitle: string
): void {
  const cleanedTitle = removeScores(originalTitle)
  titleElement.textContent = cleanedTitle
  titleElement.removeAttribute('is-empty')
}

export function countHiddenSpoilersOnDocument(): number {
  const hiddenElements = $$('[data-spoiler-placeholder]')
  return hiddenElements.length
}
