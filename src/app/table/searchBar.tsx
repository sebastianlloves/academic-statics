import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function SearchBar () {
  return (
    <div className='p-2 '>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue>a</SelectValue>
        </SelectTrigger>
        <SelectContent hidden>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SearchBar
