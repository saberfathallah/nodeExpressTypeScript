import request from "supertest";

import mongoose from "mongoose";

import Comment from "../../../models/comment";
import app from "../../../index";

function makeAddRequest(userid, body = {}, postId) {
  return request(app.listen(), ()=>{})
    .post(`/comments/${postId}`)
    .send(body)
    .set("userid", userid);
}

beforeAll(async () => {
  await Comment.remove({});
});

describe("add comment", () => {
    let categoryId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");
    let postId: any = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cb");
    let userid: any = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
    let body: any = { description: "new comment", categoryId };

  it("returns 200 when userid and params are valid", async (done) => {
    const response = await makeAddRequest(userid, body, postId);
    expect(response.status).toBe(200);
    expect(response.body.comment.description).toEqual("new comment");
    done();
  });

  it("returns 400 when params are invalid description", async (done) => {
    body.description= null;
    const response = await makeAddRequest(userid, body, postId);
    expect(response.body.error).toBe(
      "description required and string!"
    );
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid categoryId", async (done) => {
    body.categoryId= null;
    body.description= "new comment";

    const response = await makeAddRequest(userid, body, postId);
    expect(response.body.error).toBe("categoryId is required !");
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid postId", async (done) => {
    body.categoryId= categoryId;
    postId = null;
    const response = await makeAddRequest(userid, body, postId);
    expect(response.body.error).toBe("postId is required !");
    expect(response.status).toBe(400);
    done();
  });
});