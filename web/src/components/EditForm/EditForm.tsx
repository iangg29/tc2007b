// (c) Tecnologico de Monterrey 2022, rights reserved.

interface params {
  name: string;
  date: string;
  image: any;
}

const EditForm = ({ name, date, image }: params): JSX.Element => {
  return (
    <>
      <form>
        <div className="mb-6">
          <img className="container relativ mx-auto max-w-lg h-auto rounded-lg" src={image} alt="image description" />
          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload file</label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
            PNG o JPG
          </p>
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
      </form>
    </>
  );
};

export default EditForm;
