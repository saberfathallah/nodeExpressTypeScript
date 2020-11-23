import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";
import Post from "../../../models/posts";

function makeAddRequest(userid, postId) {
  return request(app.listen(), () => {})
    .delete(`/likes/${postId}`)
    .set("userid", userid);
}

const newId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");
const categoryId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
const userid = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

beforeEach(async () => {
  await Post.create({
    _id: newId,
    description: "corona",
    likes: [userid],
    categoryId,
  });
});

afterEach(async () => {
  await Post.remove({});
});

describe("add like", () => {
  it("returns 200 when userid and params are valid", async (done) => {
    const response = await makeAddRequest(userid, newId);
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
