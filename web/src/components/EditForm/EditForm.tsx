// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface params {
  name?: string;
  date?: string;
  image?: string | undefined;
}

const EditForm = ({ name, date, image }: params): JSX.Element => {
  const [file, setFile] = useState<any>(null);
  // const [photo, setPhoto] = useState<any>(null);

  const sendFile = async (): Promise<any> => {
    const formData = new FormData();
    formData.append("doc", file);
    // formData.append("photo", photo);

    try {
      await axios
        .post("http://localhost:5050/upload/files", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res: AxiosResponse<any>) => {
          alert(JSON.stringify(res?.data));
        })
        .catch((error: any) => {
          alert("Invalid extension document type. Torombolo");
          alert(JSON.stringify(error.message));
        });
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <form>
        <div className="mb-6">
          {image !== undefined && (
            <img
              className="container relative mx-auto max-w-xs h-auto rounded-lg"
              src={image}
              alt="image description"
            />
          )}
          <label className="block mb-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">Imagen</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={image}
            type="text"
            id="title"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={name}
            type="text"
            id="title"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha fin</label>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={date}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Archivo .PDF</label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            name="file"
            onChange={(e: any): void => setFile(e.target.files[0])}
            type="file"
          />
        </div>
        {/* <div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Archivo .PDF</label>
    <input
      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      aria-describedby="file_input_help"
      id="file_input"
      name="photo"
      onChange={(e: any): void => setPhoto(e.target.files[0])}
      type="file"
    />
  </div> */}
        <button
          onClick={() => {
            (async () => {
              await sendFile();
            })()
              .then((r) => r)
              .catch((e) => e);
          }}
        >
          Enviar
        </button>
      </form>
    </>
  );
};

export default EditForm;
