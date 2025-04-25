import { XIcon } from 'lucide-preact'

import { Button } from '@/components/ui/button'
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
      <Button
        tabIndex={0}
        size="icon"
        className="size-4 rounded-full p-0"
        onClick={onRemove}
        aria-label={`Remove ${keyword}`}
      >
        <XIcon className="size-3" />
      </Button>
    </Chip>
  )
}
