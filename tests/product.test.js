const request = require("supertest");
const sequelize = require("../src/db");
const app = require("../src/app");
const Product = require("../src/models/product");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await Product.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Product API Tests", () => {
  test("Create product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Test Product", stock_quantity: 10 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Product");
    expect(res.body.stock_quantity).toBe(10);
  });

  test("Increase and decrease stock successfully", async () => {
    const createRes = await request(app)
      .post("/api/products")
      .send({ name: "Widget", stock_quantity: 10 });

    const id = createRes.body.id;

    const decRes = await request(app)
      .post(`/api/products/${id}/stock/decrease`)
      .send({ amount: 5 });

    expect(decRes.status).toBe(200);
    expect(decRes.body.stock_quantity).toBe(5);

    const incRes = await request(app)
      .post(`/api/products/${id}/stock/increase`)
      .send({ amount: 3 });

    expect(incRes.status).toBe(200);
    expect(incRes.body.stock_quantity).toBe(8);
  });

  test("Prevent insufficient stock decrease", async () => {
    const createRes = await request(app)
      .post("/api/products")
      .send({ name: "Phone", stock_quantity: 2 });

    const id = createRes.body.id;

    const res = await request(app)
      .post(`/api/products/${id}/stock/decrease`)
      .send({ amount: 5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Insufficient stock");
  });

  test("Prevent negative stock on update", async () => {
    const createRes = await request(app)
      .post("/api/products")
      .send({ name: "Book", stock_quantity: 5 });

    const id = createRes.body.id;

    const res = await request(app)
      .put(`/api/products/${id}`)
      .send({ stock_quantity: -10 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Stock cannot be negative");
  });

  test("Low stock products endpoint works", async () => {
    await request(app).post("/api/products").send({
      name: "Pen",
      stock_quantity: 2,
      low_stock_threshold: 5,
    });

    await request(app).post("/api/products").send({
      name: "Notebook",
      stock_quantity: 10,
      low_stock_threshold: 5,
    });

    const res = await request(app).get("/api/products/low-stock");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Pen");
  });
});
