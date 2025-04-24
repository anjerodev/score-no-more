export const getKeywords = (): Promise<string[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['spoilerKeywords'], (result) => {
      resolve(result?.spoilerKeywords || [])
    })
  })
}

export const setKeywords = (keywords: string[]): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ spoilerKeywords: keywords }, () => {
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
