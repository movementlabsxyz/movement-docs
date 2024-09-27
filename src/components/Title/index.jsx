const Title = ({children, icon, className}) => {
  return (
    <div className={`flex items-center gap-2 text-2xl font-bold ${className}`}>
      {icon} {children}
    </div>
  )
}

export default Title
