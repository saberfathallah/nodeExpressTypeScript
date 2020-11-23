import request from "supertest";

import User from "../../../models/user";
import app from "../../../index";

function makeAddRequest(body = {}) {
  return request(app.listen(), () => {})
    .post("/users")
    .send(body);
}

beforeAll(async () => {
  await User.deleteMany({});
});

describe("create user", () => {
  it("returns 200 when userid and params are valid", async (done) => {
    const body = { name: "saber", email: "sabe@gmail.com", password: "xxxxxx" };
    const response = await makeAddRequest(body);
    expect(response.status).toBe(200);
    expect(response.body.user.name).toEqual("saber");
    done();
  });

  it("returns 400 when params are invalid email", async (done) => {
    const body = { name: "saber", email: null, password: "xxxxxx" };

    const response = await makeAddRequest(body);
    expect(response.body.error).toBe("email is required !");
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid password ", async (done) => {
    const body = { name: "saber", email: "sabe@gmail.com", password: null };

    const response = await makeAddRequest(body);
    expect(response.body.error).toBe("password is required !");
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid password ", async (done) => {
    const body = { name: null, email: "sabe@gmail.com", password: "xxxx" };

    const response = await makeAddRequest(body);
    expect(response.body.error).toBe("name is required !");
    expect(response.status).toBe(400);
    done();
  });
});
