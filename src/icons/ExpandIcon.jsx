const ExpandIcon = ({className, size}) => {
  return (
    <svg className={className} width={size ?? "24"} height={size ?? "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 19H5V14M14 5H19V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}

export default ExpandIcon
