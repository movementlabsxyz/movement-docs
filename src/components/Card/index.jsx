import ArrowRightIcon from '@site/src/icons/ArrowRight'

const Card = ({title, description, link, icon}) => {
  return (
    <div className="shadow-sm shadow-gray-100/20 bg-[#242527] rounded-xl divide-x divide-gray-200 hover:bg-black/40 hover:shadow-[#FFDA34]/50 transition-all duration-200 flex flex-col py-2 group">
      <h3 className="px-4 flex gap-2 items-center">
        {icon} {title}
      </h3>
      <div className="flex w-full h-[0.5px] bg-white/10 group-hover:bg-[#FFDA34]/50 transition-color duration-200 mb-2 opacity-40"/>
      <p className="px-4 line-clamp-3">{description}</p>
      {link && (
        <a href={link ?? "#"} className="px-4 flex items-center text-[#FFDA34]">
          See All <ArrowRightIcon />
        </a>
      )}
    </div>
  )
}

export default Card
