// (c) Tecnologico de Monterrey 2022, rights reserved.

import axios from "axios";

const webFetcher = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default webFetcher;
