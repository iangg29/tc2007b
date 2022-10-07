// (c) Tecnologico de Monterrey 2022, rights reserved.

import CheckboxDocument from "./CheckboxDocument";

const DocumentList = ({ list, handleclickCheckbox, docTypes }: any): JSX.Element => {
  return (
    <>
      {list?.map((element: any, idx: any) => (
        <CheckboxDocument
          key={idx}
          name={element.type_name}
          id={element.id}
          isChecked={element.isChecked}
          setChecked={handleclickCheckbox}
        />
      ))}
    </>
  );
};

export default DocumentList;
