// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ExoticComponent, LazyExoticComponent } from "react";

export type iRoute = {
  path: string;
  components: ExoticComponent | LazyExoticComponent<any>;
};
