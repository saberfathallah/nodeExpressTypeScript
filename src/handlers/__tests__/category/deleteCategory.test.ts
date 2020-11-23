import request from "supertest";
import mongoose from "mongoose";

import app from "../../../index";
import Category from "../../../models/category";

function makeDeleteRequest(userid, categoryId) {
  return request(app.listen(), ()=>{})
    .delete(`/categories/${categoryId}`)
    .set("userid", userid);
}
const newId = new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca");

beforeEach(async () => {
  await Category.create({
    _id: newId,
    name: "corona",
    level: 1,
  });
});

afterEach(async () => {
  await Category.remove({});
});

describe("DELETE/categories:id", () => {
  it("returns 200 when userid header is valid", async (done) => {
    const userid = "290720064";
    const categoryId = newId;
    const response = await makeDeleteRequest(userid, categoryId);

    expect(response.status).toBe(200);
    done();
  });

    it("returns 401 when userid header is invalid", async () => {
      const userid = "";
      const categoryId = newId;
      const response = await makeDeleteRequest(userid, categoryId);

      expect(response.status).toBe(401);
    });
});
