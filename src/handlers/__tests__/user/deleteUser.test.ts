import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";
import User from "../../../models/user";

function makeDeleteRequest(body) {
  return request(app.listen(), () => {})
    .delete("/users")
    .send(body);
}
const newId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

beforeEach(async () => {
  await User.create({
    _id: newId,
    name: "saber",
    email: "saer@gmail.com",
    password: "xxxxx",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("DELETE/users", () => {
  it("returns 200 when userid header is valid", async (done) => {
    const body = { email: "saer@gmail.com" };
    const response = await makeDeleteRequest(body);

    expect(response.status).toBe(200);
    done();
  });

  it("returns 400 when email don't exist", async (done) => {
    const body = { email: "ssddsdser@gmail.com" };
    const response = await makeDeleteRequest(body);

    expect(response.status).toBe(400);
    done();
  });
});
