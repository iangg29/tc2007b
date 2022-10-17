// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useMutation, useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { FiDelete } from "react-icons/fi";
import { CheckboxDocumentMutation } from "./__generated__/CheckboxDocumentMutation.graphql";
import { CheckboxDocumentQuery, CheckboxDocumentQuery$data } from "./__generated__/CheckboxDocumentQuery.graphql";

interface params {
  id: string;
  name: string;
  isChecked: boolean;
  setChecked: Function;
}

const CheckboxDocument = ({ name, isChecked, id, setChecked }: params): JSX.Element => {
  const [commitMutation] = useMutation<CheckboxDocumentMutation>(
    graphql`
      mutation CheckboxDocumentMutation($id: ID!) {
        deleteDocumentType(id: $id)
      }
    `,
  );
  const countDoc: CheckboxDocumentQuery$data = useLazyLoadQuery<CheckboxDocumentQuery>(
    graphql`
      query CheckboxDocumentQuery($id: ID!) {
        countDocumetOfType(id: $id)
      }
    `,
    { id },
    { fetchPolicy: "network-only" },
  );
  const handleDelete = (): void => {
    if (countDoc.countDocumetOfType === 0) {
      commitMutation({
        variables: {
          id: id as unknown as string,
        },
        onCompleted: () => {
          window.location.href = "/app/newannouncement";
        },
        onError: () => {
          console.log("error :(");
        },
      });
    } else {
      alert("No se puede eliminar un tipo de documento que ya tiene documentos asociados");
    }
  };
  return (
    <>
      <div className="flex justify-between  ">
        <div className="mb-2">
          <input
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setChecked(e)}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded
              border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
              dark:bg-gray-700 dark:border-gray-600"
          ></input>
          <label htmlFor="default-checkbox" className="ml-2 text- font-medium text-gray-900 dark:text-gray-300">
            {name}
          </label>
        </div>
        <button
          onClick={handleDelete}
          type="button"
          className="my-1 order-last px-1 mr-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          <FiDelete />
        </button>
      </div>
    </>
  );
};

export default CheckboxDocument;
