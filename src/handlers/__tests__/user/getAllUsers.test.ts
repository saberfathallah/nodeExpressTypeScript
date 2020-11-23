import request from "supertest";
import app from "../../../index";

function makeGetRequest(userid) {
  return request(app.listen()).get("/users").set("userid", userid);
}

describe("GET/Users", () => {
  it("returns 200 when userid header is valid", async (done) => {
    const userid = "290720064";
    const response = await makeGetRequest(userid);

    expect(response.status).toBe(200);
    done();
  });
});
