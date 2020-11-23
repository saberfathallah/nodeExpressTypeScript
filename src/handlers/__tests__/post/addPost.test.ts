import request from "supertest";
import mongoose from "mongoose";

import Post from "../../../models/posts";
import app from "../../../index";

function makeAddRequest(userid, body = {}) {
  return request(app.listen(), () => {})
    .post("/posts")
    .send(body)
    .set("userid", userid);
}

beforeAll(async () => {
  await Post.remove({});
});

describe("add Post", () => {
  let categoryId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");
  let userid: any = new mongoose.Types.ObjectId("56cb91bdc3464f14678934cc");
  let body: any = { description: "new post", categoryId };

  it("returns 200 when userid and params are valid", async (done) => {
    const response = await makeAddRequest(userid, body);
    expect(response.status).toBe(200);
    expect(response.body.post.description).toEqual("new post");
    done();
  });

  it("returns 400 when params are invalid description", async (done) => {
    body.description = null;
    const response = await makeAddRequest(userid, body);
    expect(response.body.error).toBe("description is required and required");
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid categoryId", async (done) => {
    body.categoryId = null;
    body.description = "new post";

    const response = await makeAddRequest(userid, body);
    expect(response.body.error).toBe("categoryId is required !");
    expect(response.status).toBe(400);
    done();
  });
});
