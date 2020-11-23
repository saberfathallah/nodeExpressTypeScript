import request from "supertest";

import mongoose from "mongoose";

import Comment from "../../../models/comment";
import app from "../../../index";

function makePutRequest(userid, body = {}, commentId) {
  return request(app.listen(), ()=>{})
    .put(`/comments/${commentId}`)
    .send(body)
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

describe("update comment", () => {

    const body = { description: "new comment updated" };

  it("returns 200 when userid and params are valid", async (done) => {
    const response = await makePutRequest(userid, body, newId);
    expect(response.status).toBe(200);
    expect(response.body.comment.description).toEqual("new comment updated");
    done();
  });
});