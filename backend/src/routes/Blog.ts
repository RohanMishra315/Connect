import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET : string;
  },
  Variables: {
    userId: string;
  }
}>();

blogRouter.use("/*",  async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader,c.env.JWT_SECRET);
  if (user && typeof user.id === 'string') {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "you are not logged in"
    })
  }
  
})

blogRouter.post('/',  async (c) => {
  const prisma = new PrismaClient ({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const authorId = c.get("userId")
   const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: (authorId)  
      }
  })
  
  return c.json({
    id: blog.id
  })

})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient ({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const blogId = body.id;
  const updateTitle = body.title;
  const updateContent = body.content;

  try {

    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: updateTitle,
        content: updateContent,
      }
    })

    return c.json({
      message: 'Blog updated successfully',
      blog: updatedBlog,
    })

  } catch(e) {
    return c.json({
      error: 'failed to update blog post'
    })
  }
	
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blogs, // Changed to `blogs` to be consistent
    });
    
  } catch (error) {
    console.error("Error fetching blogs:", error); // Log the error for debugging
    c.status(500); // Send a 500 status for server error
    return c.json({
      message: 'An error occurred while fetching blogs.',
    });
  }
});


blogRouter.get('/:id',  async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient ({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
   
   const blog = await prisma.blog.findFirst({
    where: {
      id: Number(id)
      
    }, 
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true

        }
      }
    }
  })


  if (!blog) {
    c.status(404);
    return c.json({
      message: 'Blog not found',
    });
  }
  
  return c.json({
    blog
  })
    
  } catch(e) {
    c.status(411);
    return c.json({
      message: 'error occured while fetching'
    })
  }

  

	
})

