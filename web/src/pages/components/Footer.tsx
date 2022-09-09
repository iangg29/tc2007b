// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Footer } from "flowbite-react";

const Foot = (): JSX.Element => {
  return (
    <>
      <Footer container={false}>
        <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#396fb1"
            fillOpacity="0.9"
            d="M0,288L80,266.7C160,245,320,203,480,208C640,213,800,267,960,
            277.3C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,
            1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </Footer>
    </>
  );
};

export default Foot;
