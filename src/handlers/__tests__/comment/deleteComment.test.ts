import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";
import Comment from "../../../models/comment";

function makeDeleteRequest(userid, commentId) {
  return request(app.listen(), ()=>{})
    .delete(`/comments/${commentId}`)
    .set("userid", userid);
}
const newId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");
const postId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cb");
const categoryId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
const userid = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

beforeEach(async () => {
  await Comment.create({
    _id: newId,
    description: "corona",
    postId,
    categoryId,
  });
});

afterEach(async () => {
  await Comment.remove({});
});

describe("DELETE/:id", () => {
  it("returns 200 when userid header is valid", async (done) => {
    const commentId = newId;
    const response = await makeDeleteRequest(userid, commentId);

    expect(response.status).toBe(200);
    done();
  });
});
