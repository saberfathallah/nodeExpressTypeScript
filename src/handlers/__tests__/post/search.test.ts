import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";

function makeGetRequest(userid, categoryId) {
  return request(app.listen())
    .get(`/posts/${categoryId}`)
    .set("userid", userid);
}

describe("GET/postsCategoryById", () => {
  const userid = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
  const query = "query";

  it("returns 200 when userid header is valid", async (done) => {
    const response = await makeGetRequest(userid, query);
    expect(response.status).toBe(200);
    done();
  });

  it("returns 401 when userdid header is invalid", async (done) => {
    const response = await makeGetRequest("", query);

    expect(response.status).toBe(401);
    done();
  });
});
