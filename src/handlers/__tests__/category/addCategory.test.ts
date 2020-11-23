import request from "supertest";

import Category from "../../../models/category";
import app from "../../../index";

function makeAddRequest(userid, body = {}) {
  return request(app.listen(), ()=>{})
    .post("/categories")
    .send(body)
    .set("userid", userid);
}

beforeAll(async () => {
  await Category.remove({});
});

describe("add category", () => {
  it("returns 200 when userid and params are valid", async (done) => {
    const userid = "290720064";
    const body = { name: "news", level: 1 };
    const response = await makeAddRequest(userid, body);
    expect(response.status).toBe(200);
    expect(response.body.category.name).toEqual("news");
    done();
  });

  it("returns 400 when params are invalid level", async (done) => {
    const userid = "290720064";
    const body = { name: "news", level: null };
    const response = await makeAddRequest(userid, body);
    expect(response.body.error).toBe(
      "level is required or one of 1, 2, 3, 4 !"
    );
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid parentId", async (done) => {
    const userid = "290720064";
    const body = { name: "news", level: 1, parentId: true };
    const response = await makeAddRequest(userid, body);
    expect(response.body.error).toBe("categoryId is obejctId !");
    expect(response.status).toBe(400);
    done();
  });

  it("returns 400 when params are invalid name", async (done) => {
    const userid = "290720064";
    const body = { name: null, level: 1 };
    const response = await makeAddRequest(userid, body);
    expect(response.body.error).toBe("name is required or string !");
    expect(response.status).toBe(400);
    done();
  });

  it("returns 401 when userid header is invalid", async (done) => {
    const userid = "";
    const body = { name: "news", level: 1 };
    const response = await makeAddRequest(userid, body);

    expect(response.status).toBe(401);
    done();
  });
});
