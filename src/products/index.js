import express from "express"
import Product from "./model.js";

const productsRouter = express.Router();

productsRouter
    .post("/", async (req, res, next) => {
        try {
            const product = new Product(req.body)
            await product.save()
            res.status(201).send(product)
        } catch {
            res.status(400).send()
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id)
            if (!product) {
                return res.status(404).send()
            }
            res.send(product)
        } catch (error) {
            res.status(400).send()
        }
    })

export default productsRouter