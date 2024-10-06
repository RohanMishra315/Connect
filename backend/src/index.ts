import { Hono } from 'hono';
import { userRouter } from './routes/User';
import { blogRouter } from './routes/Blog';
import { cors } from 'hono/cors';



// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
   
	}
}>();
app.use('/*', cors())
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)





export default app;
