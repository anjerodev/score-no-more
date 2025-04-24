import { useEffect, useState } from 'preact/hooks'

import { addKeyword, getKeywords, removeKeyword } from '@/lib/utils/chrome'

import { Input } from '@/components/ui/input'

import { KeywordChip } from '@/components/keyword-chip'

export function Popup() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getKeywords().then((stored) => {
      setKeywords(stored)
      setLoading(false)
    })
  }, [])

  return (
    <div class="flex w-[320px] flex-col items-center justify-center p-4">
      <Input
        id="keywordInput"
        type="text"
        placeholder="Add a keyword"
        autofocus
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            const inputValue = e.currentTarget.value
            e.currentTarget.value = ''
            if (inputValue) {
              const newKeyword = inputValue.trim().toLowerCase()
              if (newKeyword && !keywords.includes(newKeyword)) {
                setKeywords((prev) => [...prev, newKeyword])
                // Add the keyword to storage
                addKeyword(newKeyword).then(() => {
                  console.log('Keyword added:', newKeyword)
                })
              }
            }
          }
        }}
      />
      <div class="mt-2 flex w-full flex-wrap gap-2 overflow-hidden">
        {loading ? (
          <div class="text-foreground">Loading...</div>
        ) : (
          keywords.map((keyword) => (
            <KeywordChip
              keyword={keyword}
              onRemove={() => {
                setKeywords((prev) => prev.filter((k) => k !== keyword))
                removeKeyword(keyword).then(() => {
                  console.log('Keyword removed:', keyword)
                })
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
