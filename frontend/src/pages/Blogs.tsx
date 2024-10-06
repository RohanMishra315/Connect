import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-2xl">
          {blogs.map((blog  => 
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="Feb 3, 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
