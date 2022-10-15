// (c) Tecnologico de Monterrey 2022, rights reserved.

import DocumentList from "../DocumentList/DocumentList";
import { useLazyLoadQuery, useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import useChecked from "../../hooks/useChecked";
import Cookies from "js-cookie";
import {
  NewAnnouncementFormQuery,
  NewAnnouncementFormQuery$data,
} from "./__generated__/NewAnnouncementFormQuery.graphql";
import { NewAnnouncementFormMutation } from "./__generated__/NewAnnouncementFormMutation.graphql";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { AiTwotoneFileAdd } from "react-icons/ai";
interface documentTypeType {
  id: string | undefined;
  name: string | undefined;
  isChecked: boolean;
}

interface newCitation {
  title: string;
  date: string;
  description: string;
}

const NewAnnouncementForm = (): JSX.Element => {
  // Todo adding file and images functions an ----

  const [file, setFile] = useState<any>(null);
  // const user: any = useAppSelector(selectUser);

  const sendFile = async (): Promise<any> => {
    const formData = new FormData();
    formData.append("1", file);

    try {
      const res = await axios.post("/upload/files", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: Cookies.get("token") as string,
        },
      });
      return res.data.paths[0];
    } catch (error: any) {
      console.error(error);
    }
  };

  // Todo ----------------------------------------------------------------

  const [image, setImage] = useState<any>(null);
  // const user: any = useAppSelector(selectUser);

  const sendImage = async (): Promise<any> => {
    const formData = new FormData();
    formData.append("1", image);

    // try {
    //   await axios
    //     .post("/upload/photos", formData, {
    //       headers: {
    //         "Content-type": "multipart/form-data",
    //         Authorization: Cookies.get("token") as string,
    //       },
    //     })
    //     .then((res: AxiosResponse<any>) => {
    //       alert(JSON.stringify(res?.data));
    //    // handleSubmit(onSubmitForm, onError)().catch(() => {});
    //     })
    //     .catch((error: any) => {
    //       alert("Invalid extension document type.");
    //       alert(JSON.stringify(error.message));
    //     });
    // } catch (error: any) {
    //   console.error(error);
    // }

    try {
      const res = await axios.post("/upload/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: Cookies.get("token") as string,
        },
      });
      return res.data.paths[0];
    } catch (error: any) {
      console.error(error);
    }
  };

  // Todo ----------------------------------------------------------------

  const today = new Date();
  const date =
    today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const { register, handleSubmit, getValues } = useForm<newCitation>();

  const data: NewAnnouncementFormQuery$data = useLazyLoadQuery<NewAnnouncementFormQuery>(
    graphql`
      query NewAnnouncementFormQuery {
        documentTypes {
          id
          type_name
        }
      }
    `,
    { fetchPolicy: "network-only" },
  );

  const [commitMutation] = useMutation<NewAnnouncementFormMutation>(
    graphql`
      mutation NewAnnouncementFormMutation(
        $title: String!
        $description: String!
        $citation_document: String!
        $end_date: String!
        $document_types: [ID]!
      ) {
        createCitation(
          title: $title
          description: $description
          citation_document: $citation_document
          end_date: $end_date
          document_types: $document_types
        ) {
          title
          description
          end_date
        }
      }
    `,
  );

  const { documentTypes } = data;
  console.debug(documentTypes);

  const initialState: any = documentTypes?.map((item: any): documentTypeType | undefined => {
    const newItem: documentTypeType | undefined = { ...item, isChecked: false };
    return newItem;
  });

  const [list, handleclickCheckbox] = useChecked(initialState);

  const onSubmitForm = async (): Promise<void> => {
    const docType = list
      ?.filter((element: any) => element.isChecked === true)
      .map((filteredElement: any) => {
        const newElement: any = filteredElement.id;
        return newElement;
      });

    const myTitle = getValues("title");
    // const myDescription = getValues("description");
    const myDate = getValues("date");

    if (docType?.length !== 0 && file != null) {
      const files = await sendFile();
      const images = await sendImage();

      commitMutation({
        variables: {
          title: myTitle as unknown as string,
          description: images.path as unknown as string,
          // description: myDescription as unknown as string,
          citation_document: files.path as unknown as string,
          end_date: myDate as unknown as string,
          document_types: docType as unknown as [string],
        },
        onCompleted: () => {
          window.location.href = "/app/home";
          console.log("El path que se paso por la imagen fue:", images.path);
        },
        onError: () => {
          console.log("error :(");
          console.log(docType);
        },
      });
    } else {
      void Swal.fire({
        title: "Error",
        icon: "error",
        text: "Verifica tus campos de entrada.",
        customClass: {
          container: "swal2-container",
        },
      });
    }
  };

  const onError = (): any =>
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Verifica tus campos de entrada.",
      customClass: {
        container: "swal2-container",
      },
    });

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(onSubmitForm, onError)(e).catch(() => {});
          }}
        >
          <div className="TituloPrincipal flex row-span-1 px-11">
            <div className="mx-7 my-5 flex">
              <h1 className="text-4xl font-semibold text-main-500">Nueva Convocatoria</h1>
            </div>
          </div>
          <div className="w-10/12 mx-10 grid grid-cols-2 place-content-center">
            <div className="SubmitDocumentForm px-8">
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Nombre Convocatoria
                </label>

                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="title"
                  autoComplete="off"
                  {...register("title", {
                    required: true,
                    pattern: { value: /^\S+[a-zA-Z\s]*/, message: "error message" },
                  })}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="image_fileinput"
                >
                  Imagen
                </label>
                <input
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="image_file_help"
                  id="description"
                  type="file"
                  name="image_file"
                  onChange={(e: any): void => setImage(e.target.files[0])}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="image_file_help">
                  JPEG, PNG, JPG.
                </p>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Fecha Fin Convocatoria
                </label>

                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="date"
                  placeholder="Seleccione la fecha"
                  autoComplete="off"
                  {...register("date", {
                    required: true,
                    validate: {
                      date_check: (v) => v >= date,
                    },
                  })}
                />
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="default_size">
                PDF Convocatoria
              </label>

              <input
                className="block mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="default_size"
                type="file"
                name="file"
                onChange={(e: any): void => setFile(e.target.files[0])}
              ></input>
            </div>
            <div>
              <div className="mx-7 my-5 flex  flex-col  px-52">
                <h1 className="text-2xl font-semibold text-main-500">Documentos Necesarios</h1>
                <DocumentList list={list} handleclickCheckbox={handleclickCheckbox} docTypes={[]} />
                <button
                  type="button"
                  className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <AiTwotoneFileAdd size={30} /> Nuevo Documento
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="flex flex-col mx-auto content-center items-center">
            <button
              className="w-48 bg-main-500 hover:bg-main-500/70  hover:scale-105 transition-all ease-in-out duration-500 active:scale-95 font-bold text-white rounded-3xl py-2 text-sm mt-5"
              type="submit"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewAnnouncementForm;
