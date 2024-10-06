import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { CompleteBlog } from "../components/CompleteBlog";





export const Blog = () => {
  const {id} = useParams();
  const { loading, blog} = useBlog({
    id: id || ""
  });
  if (loading) {
    return (
      <div>
        <div className="h-16 bg-gray-300 animate-pulse"></div> {/* Appbar Skeleton */}
        
        <div className="flex justify-center">
          <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-12 space-y-8 animate-pulse">
            
            {/* Left section (Main content) */}
            <div className="col-span-8">
              <div className="h-10 w-3/4 bg-gray-300 rounded mb-4"></div> {/* Blog Title Skeleton */}
              <div className="h-4 w-1/4 bg-gray-300 rounded mb-6"></div> {/* Post Date Skeleton */}
              <div className="h-4 w-full bg-gray-300 rounded mb-2"></div> {/* Blog Content Skeleton (1st line) */}
              <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div> {/* Blog Content Skeleton (2nd line) */}
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div> {/* Blog Content Skeleton (3rd line) */}
              <div className="h-4 w-2/4 bg-gray-300 rounded mb-2"></div> {/* Blog Content Skeleton (4th line) */}
            </div>
            
            {/* Right section (Author info) */}
            <div className="col-span-4">
              <div className="h-4 w-20 bg-gray-300 rounded mb-4"></div> {/* Author label */}
              
              <div className="flex">
                {/* Author Avatar Skeleton */}
                <div className="pr-4 flex flex-col justify-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
                
                {/* Author Name and Description Skeleton */}
                <div>
                  <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div> {/* Author Name */}
                  <div className="h-4 w-48 bg-gray-300 rounded"></div> {/* Author catchphrase */}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  return <div>
    <CompleteBlog blog={blog} />

    
  </div>
}