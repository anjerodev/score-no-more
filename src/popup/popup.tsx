import type { JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  addKeyword,
  getKeywords,
  // getHiddenCount,
  // incrementHiddenCount,
  removeKeyword,
} from '@/lib/utils/chrome'
// import { countHiddenSpoilersOnDocument } from '@/lib/utils/dom'
import { cn } from '@/lib/utils/tailwind'

import { Button } from '@/components/ui/button'
import { Input, inputStyle } from '@/components/ui/input'

import { KeywordChip } from '@/components/keyword-chip'

export function Popup() {
  const [value, setValue] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  // const [hiddenCount, setHiddenCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const keywordsPromise = getKeywords()
      // const hiddenCountPromise = getHiddenCount()
      const [storedKeywords] = await Promise.all([keywordsPromise])
      console.log({ storedKeywords })
      // setHiddenCount(storedCount)
      setKeywords(storedKeywords)
      setLoading(false)
    }
    init()
  }, [])

  const onSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const inputValue = formData.get('keyword') as string

    if (inputValue) {
      const newKeyword = inputValue.trim().toLowerCase()
      if (newKeyword && !keywords.includes(newKeyword)) {
        setKeywords((prev) => [...prev, newKeyword])
        // Add the keyword to storage
        addKeyword(newKeyword)
      }
    }

    setValue('')
  }

  return (
    <div className="flex h-[600px] w-[320px] flex-col space-y-4 p-4">
      <header className="space-y-4">
        <div className="flex items-center space-x-2">
          <img src="/icons/icon32.png" alt="Logo" className="size-8" />
          <p className="text-lg font-bold">Score no more</p>
        </div>
        <p className="text-muted-foreground text-sm">
          Enter keywords to detect potential spoilers in YouTube titles. Matches
          with scores will be hidden and thumbnails blurred.
        </p>
      </header>
      <form
        onSubmit={onSubmit}
        className={cn(
          inputStyle,
          'focus-within:ring-ring flex w-full items-center gap-2 py-2 pr-2 focus-within:ring-4 focus-within:outline-none'
        )}
      >
        <Input
          name="keyword"
          type="text"
          placeholder="Eg. betis"
          autofocus
          value={value}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          className="border-none bg-transparent px-0 focus:border-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="sm"
          className="h-6 rounded-sm"
          disabled={!value}
        >
          Add
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6.00002 5.16667L2.66669 8.50001L6.00002 11.8333"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.3334 5V5.83333C13.3334 6.54058 13.0524 7.21886 12.5523 7.71895C12.0522 8.21905 11.3739 8.5 10.6667 8.5H2.66669"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </form>
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="flex flex-wrap items-start justify-start gap-2 overflow-auto">
          {loading ? (
            <div className="text-foreground">Loading...</div>
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
      {/* <p className="text-muted-foreground text-end text-xs">
        {hiddenCount} spoilers hidden
      </p> */}
    </div>
  )
}
