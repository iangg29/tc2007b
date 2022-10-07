// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/app");
  }, [navigate]);

  return <div>Landing page</div>;
};

export default Landing;
