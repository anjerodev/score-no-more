import {
  STORAGE_KEYWORDS_KEY,
  STORAGE_SPOILERS_COUNT_KEY,
} from '@/lib/constants'

export const getKeywords = (): Promise<string[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([STORAGE_KEYWORDS_KEY], (result) => {
      resolve(result?.[STORAGE_KEYWORDS_KEY] || [])
    })
  })
}

export const setKeywords = (keywords: string[]): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [STORAGE_KEYWORDS_KEY]: keywords }, () => {
      resolve()
    })
  })
}

export const removeKeyword = (keyword: string): Promise<void> => {
  return new Promise((resolve) => {
    getKeywords().then((keywords) => {
      const updatedKeywords = keywords.filter((k) => k !== keyword)
      setKeywords(updatedKeywords).then(() => {
        resolve()
      })
    })
  })
}

export const addKeyword = (keyword: string): Promise<void> => {
  return new Promise((resolve) => {
    getKeywords().then((keywords) => {
      const updatedKeywords = [...keywords, keyword]
      setKeywords(updatedKeywords).then(() => {
        resolve()
      })
    })
  })
}

export const clearKeywords = (): Promise<void> => {
  return new Promise((resolve) => {
    setKeywords([]).then(() => {
      resolve()
    })
  })
}

/**
 * Get the number of hidden spoilers from storage
 */
export const getHiddenCount = (): Promise<number> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([STORAGE_SPOILERS_COUNT_KEY], (result) => {
      resolve(result?.[STORAGE_SPOILERS_COUNT_KEY] || 0)
    })
  })
}

export const incrementHiddenCount = (n: number): Promise<void> => {
  return new Promise((resolve) => {
    getHiddenCount().then((count) => {
      const newCount = count + n
      console.log({ count, newCount })
      chrome.storage.sync.set(
        { [STORAGE_SPOILERS_COUNT_KEY]: newCount },
        () => {
          resolve()
        }
      )
    })
  })
}

export const cleanCount = (): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [STORAGE_SPOILERS_COUNT_KEY]: 0 }, () => {
      resolve()
    })
  })
}
