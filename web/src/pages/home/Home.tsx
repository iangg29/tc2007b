// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";
import NoticeCard from "../../components/NoticeCard/NoticeCard";
import EditModal from "../../components/EditModal/EditModal";
import EditForm from "../../components/EditForm/EditForm";
import notice1 from "../../assets/images/notice1.png";
import notice2 from "../../assets/images/notice2.png";

const Home = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (): void => setShow(true);
  const onClose = (): void => setShow(false);

  return (
    <>
      <div>
        <div className="flex w-full">
          <div>
            <div className="flex row-span-1">
              <div className="my-5 flex flex-col">
                <h1 className="text-4xl font-semibold text-main-500">Convocatorias</h1>
              </div>
              <div className="mx-7 my-1 flex flex-col">
                <button
                  onClick={handleShow}
                  className="bg-main-500 hover:bg-main-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
                >
                  + Nueva Convocatoria
                </button>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <NoticeCard img={notice1} name={"Convocatoria1"} date={"2022-10-12"} />
              </div>
              <div className="flex flex-col">
                <NoticeCard img={notice2} name={"Convocatoria2"} date={"2022-11-26"} />
              </div>
            </div>
          </div>
        </div>
        <EditModal
          show={show}
          onClose={onClose}
          header={"Crear convocatoria"}
          props={<EditForm name={undefined} date={undefined} image={undefined} />}
        />
      </div>
    </>
  );
};

export default Home;
