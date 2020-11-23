import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";

function makeGetRequest(userid, from, limit) {
  return request(app.listen())
    .get(`/posts/all/${from}/${limit}`)
    .set("userid", userid);
}

describe("GET/allPosts", () => {
  const userid: any = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
  const from = 0;
  const limit = 5;
  it("returns 200 when userid header is valid", async (done) => {
    const response = await makeGetRequest(userid, from, limit);
    expect(response.status).toBe(200);
    done();
  });

  it("returns 401 when userdid header is invalid", async (done) => {
    const response = await makeGetRequest("", from, limit);

    expect(response.status).toBe(401);
    done();
  });
});
