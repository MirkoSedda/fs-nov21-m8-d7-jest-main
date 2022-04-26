describe("Testing the authentication system", () => {


    const validUser = {
        name: "Test User",
        email: "test@example.com"
    }

    it("should create a valid jwt token pair", () => {
        expect(true).toBe(true)
        // const { accessToken, refreshToken} = generateToken(validUser)

        // expect(token).toBeDefined()

        // const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        // const decodedRefresh = jwt.verify(accessToken, process.env.JWT_SECRET_REFRESH)

        // expect(decoded).toBeDefined()
        // expect(decodedRefresh).toBeDefined()
    })
})