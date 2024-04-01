const request = require("supertest");
const app = require("../src/app");

describe("Authentication Routes", () => {
	describe("POST /auth/register", () => {
		it("should register a new user", async () => {
			const res = await request(app).post("/auth/register").send({
				username: "mehedi",
				email: "mehedi@example.com",
				password: "mehedi123",
			});

			expect(res.statusCode).toEqual(201);
			expect(res.body).toHaveProperty(
				"message",
				"User registered successfully"
			);
		});
	});

	describe("POST /auth/login", () => {
		it("should log in an existing user with correct credentials", async () => {
			const res = await request(app).post("/auth/login").send({
				email: "mehedi@example.com",
				password: "mehedi123",
			});

			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty("token");
		});

		it("should return 401 for invalid credentials", async () => {
			const res = await request(app).post("/auth/login").send({
				email: "test@example.com",
				password: "incorrect_password",
			});

			expect(res.statusCode).toEqual(401);
		});
	});

	// Test user logout (optional)
	// describe('POST /auth/logout', () => {
	//   it('should log out the current user', async () => {
	//     // Implement logout test if needed
	//   });
	// });
});
