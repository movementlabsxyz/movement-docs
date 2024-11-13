const Cards = ({children}) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-2">
      {children}
    </div>
  )
}

export default Cards
