// (c) Tecnologico de Monterrey 2022, rights reserved.
import Foot from "../includes/Footer";
import NavBar from "../includes/NavBar";
import NoticeCard from "../components/NoticeCard";
import Title from "../components/Title";

const Home = (): JSX.Element => {
  const nuevaConvocatoria = (): void => {
    alert("Se está creando nueva convocatoria");
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="flex w-full h-screen">
          <div>
            <Title text={"Convocatoria"} method={nuevaConvocatoria} />
            <div className="flex flex-row">
              <div className="flex flex-col">
                <NoticeCard
                  img={"https://images.wallpaperscraft.com/image/single/cat_kitten_glance_177552_1600x900.jpg"}
                  name={"Convocatoria1"}
                  date={"12/10/22"}
                />
              </div>
              <div className="flex flex-col">
                <NoticeCard
                  img={
                    "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                  }
                  name={"Convocatoria2"}
                  date={"26/11/22"}
                />
              </div>
            </div>
          </div>
        </div>
        <Foot />
      </div>
    </>
  );
};

export default Home;
