const request = require("supertest")("http://localhost:8080");

jest.setTimeout(20000);

describe("RestFull API", () => {
  const productID = "619fc26cb73812bf41e17b63";
  const data = {
    name: "Escuadraa",
    description: "Esta es una escuadraaaa",
    code: "297AR",
    imageURL:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    price: 34556,
    stock: 1001,
  };
  test("/GET should return a product by their ID", async () => {
    const response = await request.get(`/api/productos/${productID}`);
    expect(response.body._id).toBe(productID);
  });

  test("/POST should return the created product", async () => {
    let response = await request
      .post(`/api/productos`)
      .send(data)
      .expect("Content-type", /json/)
      .expect(200);
    expect(response.body).toMatchObject(data);
  });

  test("/PATCH should return updated product", async () => {
    try {
      const dataToUpdate = {
        name: "Escuadra 22345111a1qa",
        description: "Esta es una escuadra 212222243aa",
      };
      let response = await request
        .patch(`/api/productos/${productID}`)
        .send(dataToUpdate);

      expect(response.body).toMatchObject(dataToUpdate);
    } catch (error) {
      console.log(error);
    }
  });

  test("/DELETE should return status 200", async () => {
    try {
      let responseDelete = await request
        .delete(`/api/productos/${productID}`)
        .expect(200);
    } catch (error) {
      console.log(error);
    }
  });

  test("/GET should return null when searching for deleted product ID", async () => {
    try {
      let response = await request.get(`/api/productos/${productID}`);
      expect(response).toBeNull();
    } catch (error) {
      console.log(error);
    }
  });
});
