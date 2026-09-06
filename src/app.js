import express from "express"
import { userRouter } from "./routes/userRouter.js"
import { postRouter } from "./routes/postRouter.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Internal Server Error" })
})

app.listen(PORT, err => {
    if(err) {
        console.log(err)
        return
    }
    console.log("Server running on PORT:", PORT)
})
