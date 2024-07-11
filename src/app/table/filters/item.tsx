interface ItemProps {
  value: string,
  quantity: number
}

function Item ({ value, quantity } : ItemProps) {
  return (
    <div className='flex justify-between items-center gap-x-5 w-full mr-3'>
      <h4 className='text-sm align-middle'>{value}</h4>
      <p className='font-mono text-muted-foreground align-middle w-5 text-right'>{quantity}</p>
    </div>
  )
}

export default Item
