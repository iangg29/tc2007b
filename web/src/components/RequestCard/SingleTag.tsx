// (c) Tecnologico de Monterrey 2022, rights reserved.

interface Props {
  element: {
    label: String;
  };
  key: Number;
}

const SingleTag = ({ element }: Props): JSX.Element => {
  return (
    <div>
      <a
        className="rounded-full  bg-gray-500 px-3 py-1 text-center text-sm font-xs
       text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {element.label}
      </a>
    </div>
  );
};

export default SingleTag;
