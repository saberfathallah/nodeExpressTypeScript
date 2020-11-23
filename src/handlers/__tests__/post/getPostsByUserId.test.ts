import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";

function makeGetRequest(userid) {
  return request(app.listen()).get("/posts").set("userid", userid);
}

describe("GET/postsUserById", () => {
  const userid = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
  it("returns 200 when userid header is valid", async (done) => {
    const response = await makeGetRequest(userid);
    expect(response.status).toBe(200);
    done();
  });
});
