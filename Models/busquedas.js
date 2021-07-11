const fs = require("fs");
const axios = require("axios").default;

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";
  constructor() {
    this.historial = this.leerDB();
  }
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
  async climaLupar(lat, lon) {
    try {
      const intanceAxiosL = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          appid: "f0595dd08305d20b205778f3e8b9a647",
          units: "metric",
          lang: "es",
        },
      });
      const resp = await intanceAxiosL.get();
      return {
        desc: resp.data.weather[0].description,
        temMin: resp.data.main.temp_min,
        temMax: resp.data.main.temp_max,
        temp: resp.data.main.temp,
      };
    } catch (error) {
      console.error("error", error);
    }
  }
  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    } else {
      this.historial.unshift(lugar);
      this.guardarDB();
    }
  }
  guardarDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.historial));
  }
  leerDB() {
    if (fs.existsSync(this.dbPath)) {
      const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      return JSON.parse(info);
    } else {
      return;
    }
  }
}
module.exports = Busquedas;
