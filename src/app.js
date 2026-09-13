import express from "express"
import { userRouter } from "./routes/userRouter.js"
import { postRouter } from "./routes/postRouter.js"
import { commentRouter } from "./routes/commentRouter.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js"
import { authRouter } from "./routes/authRouter.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, err => {
    if(err) {
        console.log(err)
        return
    }
    console.log("Server running on PORT:", PORT)
})
