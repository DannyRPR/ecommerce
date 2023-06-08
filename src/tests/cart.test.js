const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require('../models');


let token;
let cartId;

beforeAll( async () => {
    const cred = {
      email: "asossoft724@gmail.com",
      password: "1234789",
    }
 const res= await request(app).post('/users/login').send(cred);
 token = res.body.token;
})


test('POST /cart should create a cart', async () =>{
    const result = await Product.create({
        title: "desktop",
        description: "xeon 8 nucleos",
        brand: "clon",
        price: 700
    })
    const cart = {
        productId: result.id,
        quantity: 40
    }

    const res = await request(app).post('/carts').send(cart).set('Authorization', `Bearer ${token}`);
    await result.destroy();
    cartId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /carts', async () => {
  const res = await request(app).get('/carts').set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /carts/:id", async () => {
    const cartUpdate = {
      quantity: 6
    };
    const res = await request(app).put(`/carts/${cartId}`).send(cartUpdate).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdate.quantity);
  });
  


test("DELETE /carts/:id", async () => {
  const res = await request(app).delete(`/carts/${cartId}`).set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
