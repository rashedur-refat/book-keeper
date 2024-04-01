const sequelize = require("../src/config/database");

describe("Database Connection", () => {
	beforeAll(async () => {
		await sequelize.authenticate();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	test("should connect to the database and retrieve server version", async () => {
		const [results, metadata] = await sequelize.query("SELECT version();");
		expect(results[0].version).toBeDefined();
	});
});
