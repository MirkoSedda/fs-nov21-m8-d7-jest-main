import express from "express"
import productsRouter from "./products/index.js"

const app = express()

app.use(express.json())

app.get('/test', (req, res) => {
    res.send({ message: 'Hello, World!' })
})

app.use('/products', productsRouter)

// app.listen(3030, () => {
//     console.log('Server is running on port 3030')
// })

export default app