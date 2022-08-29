// (c) Tecnologico de Monterrey 2022, rights reserved.

import axios from "axios";

const serverAxios = axios.create({
  baseURL: "http://localhost:5050",
});

module.exports = serverAxios;
