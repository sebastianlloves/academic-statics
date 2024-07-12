interface ItemProps {
  value: string,
  quantity: number
}

function Item ({ value, quantity } : ItemProps) {
  return (
    <div className='flex justify-between items-end gap-x-5 w-full mr-3'>
      <h4 className='text-sm align-middle capitalize'>{value}</h4>
      <p className='font-mono text-muted-foreground align-middle w-5 text-right'>{quantity}</p>
    </div>
  )
}

export default Item
