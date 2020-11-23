import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";

function makeAddRequest(userid, postId) {
  return request(app.listen(), () => {})
    .post(`/likes/${postId}`)
    .set("userid", userid);
}

describe("add like", () => {
  let postId: any = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cb");
  let userid: any = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
  it("returns 200 when userid and params are valid", async (done) => {
    const response = await makeAddRequest(userid, postId);
    expect(response.status).toBe(200);
    done();
  });

  it("returns 400 when userid and params are valid", async (done) => {
    const response = await makeAddRequest(userid, null);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("postId is required !");
    done();
  });
});
