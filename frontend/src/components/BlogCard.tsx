import { Link } from "react-router-dom";


interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string

}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) => {
  return <Link to = {`/blog/${id}`}>
   <div className="border-b border-slate-200 pb-10 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">

    <div className="flex justify-center flex-col">
     <Avator name={authorName} size={"big"} />
     </div>
     
      <div className="font-normal pl-2">{authorName}</div>
      <div className="flex justify-center flex-col pl-2"><Circle /></div>
     
     <div className="pl-2 font-thin text-slate-500">{publishedDate}
      
     </div>

    
    
      
    </div>
    <div className="text-lg font-extrabold pt-2">
      {title}
    </div>
    <div className="text-xl font-extralight font-serif pt-2">
      {content.slice(0, 100) + "..."}
    </div>
    <div className="pt-10">
      {`${Math.ceil(content.length / 100)} minutes read`}
    </div >
    

  </div>
  </Link>
  

}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>

}

 export function Avator ({name, size = "small"}:{name: string, size: "small" | "big"}) {
  return <div className={`relative inline-flex items-center justify-center
  w-7 h-7 overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6": "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs": "text-md"}font-medium text-gray-600 dark:text-gray-300`}>
      {name[0]}
    </span>
  </div>

}