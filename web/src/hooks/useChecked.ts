// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";

interface documentTypeType {
  id: string;
  name: string;
  isChecked: boolean;
}

const useChecked = (listDocumentsTypes: documentTypeType[] | null): [documentTypeType[] | null, Function] => {
  const [list, setList] = useState<documentTypeType[] | null>(listDocumentsTypes);

  const handleclickCheckbox = ({ target }: any): void => {
    const newList: documentTypeType[] | undefined = list?.map((element: documentTypeType): documentTypeType => {
      const newElement = { ...element };

      newElement.isChecked = newElement.id === target.id ? !newElement.isChecked : newElement.isChecked;

      return newElement;
    });
    newList !== undefined && setList(newList);
  };
  return [list, handleclickCheckbox];
};

export default useChecked;
