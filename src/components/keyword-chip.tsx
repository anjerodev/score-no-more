import { XIcon } from 'lucide-preact'

import { Chip } from '@/components/ui/chip'

export const KeywordChip = ({
  keyword,
  onRemove,
}: {
  keyword: string
  onRemove: () => void
}) => {
  return (
    <Chip label={keyword}>
      <button
        type="button"
        tabIndex={0}
        class="bg-primary text-primary-foreground z-10 flex size-4 cursor-pointer appearance-none items-center justify-center rounded-full opacity-70 transition-[opacity,transform] outline-none select-none hover:opacity-100 active:scale-95 active:opacity-80"
        onClick={onRemove}
        aria-label={`Remove ${keyword}`}
      >
        <XIcon className="size-3" />
      </button>
    </Chip>
  )
}
