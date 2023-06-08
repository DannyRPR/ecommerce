const request = require("supertest");
const app = require("../app");

let userId;
let token;

test("POST  /users", async () => {
  const user = {
    firstName: "danni",
    lastName: "portilla",
    email: "asosoft724@gmail.com",
    password: "123456789",
    phone: "1900000000",
  };
  const res = await request(app).post("/users").send(user);
  userId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('POST /users/login should de login', async ()=> {
  const cred = {
    email: "asosoft724@gmail.com",
    password: "123456789",
  }
  const res = await request(app).post('/users/login').send(cred)
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("GET /users", async () => {
  const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(2);
});

test("UPDATE /users", async () => {
  const userUpdate = {
    firstName: "danni ricardo",
  };
  const res = await request(app).put(`/users/${userId}`).send(userUpdate).set('Authorization', `Bearer ${token}`);;
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(userUpdate.firstName);
});



test('POST /users/login with invalid credentials should throw an error', async ()=> {
  const cred = {
    email: "asosaft724@gmail.com",
    password: "1236789",
  }
  const res = await request(app).post('/users/login').send(cred)
  expect(res.status).toBe(401);
});

test("DELETE /users", async () => {
  const res = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);;
  expect(res.status).toBe(204);
});
