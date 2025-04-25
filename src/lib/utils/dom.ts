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
  placeholder.textContent = 'Possible Spoiler'
  return placeholder
}

export function hideThumbnail(thumbnailElement: HTMLImageElement): void {
  if (!thumbnailElement.hasAttribute(PROCESSED_ATTR)) {
    const placeholder = createSpoilerPlaceholder()

    thumbnailElement.style.position = 'relative'
    thumbnailElement.style.overflow = 'hidden'
    thumbnailElement.setAttribute(PROCESSED_ATTR, 'true')

    const thumbnailParent = thumbnailElement.parentElement
    if (thumbnailParent) {
      thumbnailParent.appendChild(placeholder)
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
