import request from "supertest";
import mongoose from "mongoose";

import User from "../../../models/user";
import app from "../../../index";

function makeAddRequest(body = {}) {
  return request(app.listen(), () => {})
    .post("/users/login")
    .send(body);
}

const newId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

beforeEach(async () => {
  await User.create({
    _id: newId,
    name: "saber",
    email: "saer@gmail.com",
    password: "$2y$10$75yG8eeiQZ4DpDKL8dAX9.vHo02P2HJaUwBDfDevx3VYMTEqLxoSS",
  });
});

afterEach(async () => {
  await User.deleteMany({ _id: newId });
});

describe("login", () => {
  it("returns 200 when userid and params are valid", async (done) => {
    const body = { email: "saer@gmail.com", password: "xxxxxx" };
    const response = await makeAddRequest(body);
    expect(response.status).toBe(200);
    expect(response.body.user.name).toEqual("saber");
    done();
  });

  it("returns 400 when userid and params are valid", async (done) => {
    const body = { email: null, password: "xxxxxx" };
    const response = await makeAddRequest(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("email non valid !");
    done();
  });

  it("returns 400 when userid and params are valid", async (done) => {
    const body = { email: "saer@gmail.com", password: null };
    const response = await makeAddRequest(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"password" must be a string');
    done();
  });

  it("returns 400 when userid and params are valid", async (done) => {
    const body = { email: "saer@gmail.com", password: "sdsdsdsd" };
    const response = await makeAddRequest(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Vos identifiants ne semblent pas corrects."
    );
    done();
  });
});
