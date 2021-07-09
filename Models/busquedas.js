const axios = require("axios").default;

class Busquedas {
  historial = ["Bog", "darid", "san jose"];
  constructor() {}
  async ciudad(lugar = "") {
    try {
      const intanceAxios = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: {
          access_token:
            "pk.eyJ1Ijoia3Jpc3l1cGhlciIsImEiOiJja3F3anozd3UwcGNqMnVtbmdoYTc0a2ZmIn0.zSPYuiQ0I80a0yYANi5sPg",
          limit: 5,
          language: "es",
        },
      });
      const resp = await intanceAxios.get();
      return resp.data.features.map((item) => ({
        id: item.id,
        nombre: item.place_name,
        lng: item.center[0],
        lat: item.center[1],
      }));
    } catch (error) {
      return [];
    }
  }
}
module.exports = Busquedas;
