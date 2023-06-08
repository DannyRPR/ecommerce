const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require("../models");


let token;
let productId;

beforeAll( async () => {
    const cred = {
      email: "asossoft724@gmail.com",
      password: "1234789",
    }
 const res= await request(app).post('/users/login').send(cred);
 token = res.body.token;
})


test("POST / products should create a product", async () => {
  const category = await Category.create({name:"computadores de escritorio"})
  const product = {
    title: "pc escritorio",
    description: "workstation xeon",
    brand: "hp",
    price: "12345",
    categoryId: category.id
  };
  const res = await request(app).post("/products").send(product).set('Authorization', `Bearer ${token}`);
  productId = res.body.id;
  await category.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('GET /users', async () => {
  const res = await request(app).get('/products');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('POST /products/:id/images should set products images', async () => {
  const img = await ProductImg.create({
    url: "https://pruebas",
    publicId: "false id"
  })
  const res = await request(app).post(`/products/${productId}/images`).send([img.id]).set('Authorization', `Bearer ${token}`);
  await img.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

});


test("PUT /products/:id", async () => {
     const product = {
      price: 2500,
  
  };
    const res = await request(app).put(`/products/${productId}`).send(product).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(product.price);
  });
  


  test("DELETE /products/:id", async () => {
    const res = await request(app).delete(`/products/${productId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
  