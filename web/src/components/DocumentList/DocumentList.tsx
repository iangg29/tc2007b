// (c) Tecnologico de Monterrey 2022, rights reserved.

import CheckboxDocument from "./CheckboxDocument";
import useChecked from "../../hooks/useChecked";

interface documentTypeType {
  id: string;
  name: string;
  isChecked: boolean;
}
const initialState: documentTypeType[] = [
  { id: "1", name: "RFC", isChecked: false },
  { id: "2", name: "INE", isChecked: false },
  { id: "3", name: "Comprobante de Domicilio", isChecked: true },
  { id: "4", name: "CURP", isChecked: false },
];

const DocumentList = (): JSX.Element => {
  const [list, handleclickCheckbox] = useChecked(initialState);
  return (
    <>
      <div>
        <div className="mx-7 my-5 flex flex-col px-52 ">
          <h1 className="text-2xl font-semibold text-main-500">Documentos Necesarios</h1>
          {list.map((element, idx) => (
            <CheckboxDocument
              key={idx}
              name={element.name}
              id={element.id}
              isChecked={element.isChecked}
              setChecked={handleclickCheckbox}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DocumentList;
