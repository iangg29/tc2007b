// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";
import NoticeCard from "../../components/NoticeCard/NoticeCard";
import EditModal from "../../components/EditModal/EditModal";
import EditForm from "../../components/EditForm/EditForm";
import notice1 from "../../assets/images/notice1.png";
import notice2 from "../../assets/images/notice2.png";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { HomeQuery, HomeQuery$data } from "./__generated__/HomeQuery.graphql";

const Home = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (): void => setShow(true);
  const onClose = (): void => setShow(false);

  const data: HomeQuery$data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        activeCitation {
          citation {
            title
            end_date
          }
          document {
            file_name
          }
        }
      }
    `,
    {},
  );

  const { activeCitation } = data;

  console.debug(activeCitation);

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
              {activeCitation?.map((element: any) => (
                <div className="flex flex-col">
                  <NoticeCard img={notice1} name={element.citation.title} date={element.citation.end_date} />
                </div>
              ))}
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
