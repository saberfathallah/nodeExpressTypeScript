import request from "supertest";
import app from "../../../index";

function makeGetRequest(userid) {
  return request(app.listen()).get("/categories").set("userid", userid);
}

describe("GET/favorites", () => {
  it("returns 200 when userid header is valid", async (done) => {
    const userid = "290720064";
    const response = await makeGetRequest(userid);

    expect(response.status).toBe(200);
    done()
  });

  it("returns 401 when userdid header is invalid", async (done) => {
    const userid = "";
    const response = await makeGetRequest(userid);

    expect(response.status).toBe(401);
    done()
  });
});
