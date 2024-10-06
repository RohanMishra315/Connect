import { Hono } from "hono"
import { sign } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


 export const userRouter = new  Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
   
	}
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

const body = await c.req.json();

if (!body.email || !body.password) {
  c.status(411);
  return c.json({
    message: "Email and password are required",
  });
}



 const user = await prisma.user.create({
  data: {
    email: body.email,
    password: body.password,
  },
})

const token = await sign({id: user.id}, c.env.JWT_SECRET )
return c.json({ jwt: token });
})

userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  if (!body.email || !body.password) {
    c.status(411);
    return c.json({
      message: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    }
  })

  if (!user) {
    c.status(403);
    return c.json({error: "user not found"})
  }

  const token = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({jwt: token});
})




