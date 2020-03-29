const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); // reset BD
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      // pra setar um valor no header, basta fazer set(nome, valor)
      .send({
        name: "APAD",
        email: "contato@apad.com.br",
        whatsapp: "41999887766",
        city: "Curitiba",
        uf: "PR"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
