// (c) Tecnologico de Monterrey 2022, rights reserved.

import axios from "axios";
import * as process from "process";

const serverAxios = axios.create({
  baseURL: process.env.BASE_URL,
});

module.exports = serverAxios;
