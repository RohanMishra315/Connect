import { Link } from "react-router-dom"
import { Avator} from "./BlogCard"

export const Appbar = () => {
  return <div className="border-b flex justify-between px-10 py-4">
    <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
      Medium
    </Link>
    <div>
      <Link to={'/publish'}>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-sm">
      New
    </button>
      </Link>
    
   
      <Avator size={"big"} name="Rohan" />
    </div>
  </div>
}