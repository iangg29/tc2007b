// (c) Tecnologico de Monterrey 2022, rights reserved.

import CheckboxDocument from "./CheckboxDocument";

const DocumentList = ({ list, handleclickCheckbox }: any): JSX.Element => {
  return (
    <>
      <div>
        <div className="mx-7 my-5 flex flex-col px-52 ">
          <h1 className="text-2xl font-semibold text-main-500">Documentos Necesarios</h1>
          {list?.map((element: any, idx: any) => (
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
