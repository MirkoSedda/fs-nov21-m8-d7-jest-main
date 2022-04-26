// Today we cover UNIT testing
// https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests

// First issue: we cannot use the import syntax in Jest
// To solve this:
// https://jestjs.io/docs/ecmascript-modules

// Second issue: we are starting the server WHILE importing the module
// To solve this:
// we can separate our express app configuration

import app from "../app.js"
import supertest from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const client = supertest(app)

describe("Testing the environment", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST)
  })

  const validProduct = {
    name: "Test Product",
    price: 100,
  }
  const updatedValidProduct = {
    name: "Test Product 2",
    price: 200,
  }

  let productId

  it("should test than when creating a product we are receiving a product id and a 201 status", async () => {
    const response = await client.post("/products").send(validProduct)

    expect(response.status).toBe(201)

    expect(response.body._id).toBeDefined()

    productId = response.body._id
  })

  const invalidProduct = {
    price: "100",
  }

  it("should test that when creating a product with invalid data we receive 400", async () => {
    const response = await client.post("/products").send(invalidProduct)
    expect(response.status).toBe(400)
  })

  it("should test that when retrieve a product with ID we are receiving a product", async () => {
    const response = await client.get("/products/" + "999999999999999999999999")
    expect(response.status).toBe(404)
    expect(response.body._id).toBe(undefined)
  })

  it("should test that when modifying a product with valid data we receive 204", async () => {
    const response = await client
      .put("/products/" + productId)
      .send(updatedValidProduct)
    expect(response.status).toBe(204)
  })

  it("should test that we actually delete the product when passing a valid product ID", async () => {
    const response = await client.delete("/products/" + productId)
    expect(response.status).toBe(204)
  })

  it("should test that we get a 404 if we try to delete a product when passing an undefined product ID", async () => {
    const response = await client.delete(
      "/products/" + "999999999999999999999999"
    )
    expect(response.status).toBe(404)
  })

  // it("should test that when modifying a product with non valid data we receive 404", async () => {
  //   const response = await client.get("/products/" + "999999999999999999999999")
  //   expect(response.status).toBe(404)
  //   expect(response.body._id).toBe(undefined)
  // })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })
})

// When retrieving the /products/:id endpoint:
// done -> expect requests to be 404 with a non-existing id, like 999999999999999999999999
// done -> expect requests to return the correct product with a valid id
// When deleting the /products/:id endpoint:
// done -> expect successful 204 response code
// done -> expect 404 with a non-existing id
// When updating a /product/:id endpoint with new data:
// done -> expect requests to be accepted.
// expect 404 with a non-existing id
// Expect the response.body.name to be changed
// Expect the typeof name in response.body to be “string”
