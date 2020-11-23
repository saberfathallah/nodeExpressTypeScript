import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";
import User from "../../../models/user";

function makeGetRequest(userid) {
  return request(app.listen()).get("/users/details").set("userid", userid);
}

describe("GET/User details", () => {
  const newId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

  beforeEach(async () => {
    await User.create({
      _id: newId,
      name: "saber",
      email: "saer@gmail.com",
      password: "xxxxx",
    });
  });

  it("returns 200 when userid header is valid", async (done) => {
    const response = await makeGetRequest(newId);
    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("saber");
    done();
  });
});
