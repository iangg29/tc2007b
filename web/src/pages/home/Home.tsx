// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";
import NoticeCard from "../../components/NoticeCard/NoticeCard";
import EditModal from "../../components/EditModal/EditModal";
import EditForm from "../../components/EditForm/EditForm";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { HomeQuery, HomeQuery$data } from "./__generated__/HomeQuery.graphql";

const Home = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (): void => setShow(true);
  const onClose = (): void => setShow(false);

  const [showCitation, setCitation] = useState<boolean>(true);
  const handleAllCitations = (): void => setCitation(false);
  const handleCitations = (): void => setCitation(true);

  const today = new Date();
  const date =
    today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const data: HomeQuery$data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        citations {
          id
          title
          description
          end_date
        }
      }
    `,
    {},
  );

  const { citations } = data;

  console.debug(citations);

  return (
    <>
      <div>
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
          <div className="flex flex-row-reverse">
            <label className="text-sm"> Selecciona Convocatoria</label>
          </div>
          <div className="flex flex-row-reverse">
            <button
              onClick={handleAllCitations}
              className="bg-white hover:bg-gray-300/70 ease-in-out duration-500 font-bold text-gray-500 rounded-md py-2 px-2 text-sm shadow-sm shadow-slate-300/75 border border-b-slate-300 m-1"
            >
              Todas
            </button>
            <button
              onClick={handleCitations}
              className="bg-main-500 hover:bg-main-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm shadow-sm shadow-slate-300/75 border border-b-slate-300 m-1"
            >
              Activas
            </button>
          </div>
          <div>
            {showCitation ? (
              <>
                <div className="flex flex-row flex-wrap w-full">
                  {citations
                    ?.filter((element: any) => element.end_date >= date)
                    .map((filteredElement: any) => (
                      <div className="flex flex-col basis-1/3" key={filteredElement.id}>
                        <NoticeCard
                          img={filteredElement.description}
                          name={filteredElement.title}
                          date={filteredElement.end_date}
                        />
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row flex-wrap">
                  {citations?.map((element: any) => (
                    <div className="flex flex-col basis-1/3" key={element.id}>
                      <NoticeCard img={element.description} name={element.title} date={element.end_date} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <EditModal
        show={show}
        onClose={onClose}
        header={"Crear convocatoria"}
        props={<EditForm name={undefined} date={undefined} image={undefined} />}
      />
    </>
  );
};

export default Home;
