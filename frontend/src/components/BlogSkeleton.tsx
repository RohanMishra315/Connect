export const BlogSkeleton = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-[80vh] space-y-10 pt-10">
      {/* Top Skeleton Loader */}
      <SkeletonLoader />
      
      {/* Middle Skeleton Loader */}
      <SkeletonLoader />
      
      {/* Bottom Skeleton Loader */}
      <SkeletonLoader />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="border-b border-slate-200 pb-10 w-screen max-w-screen-md cursor-pointer animate-pulse">
      <div className="flex">
        {/* Avatar Skeleton */}
        <div className="flex justify-center flex-col">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="flex flex-col pl-2">
          {/* Author Name Skeleton */}
          <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
        </div>

        <div className="flex justify-center flex-col pl-2">
          {/* Circle Skeleton */}
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
        </div>
        
        <div className="pl-2">
          {/* Published Date Skeleton */}
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="mt-4 w-3/4 h-6 bg-gray-300 rounded"></div>

      {/* Content Skeleton */}
      <div className="mt-2 w-full h-4 bg-gray-300 rounded"></div>
      <div className="mt-2 w-5/6 h-4 bg-gray-300 rounded"></div>

      {/* Read Time Skeleton */}
      <div className="mt-8 w-24 h-3 bg-gray-300 rounded"></div>
    </div>
  );
};
