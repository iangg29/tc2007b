import { useState } from "react";

interface documentTypeType {
  id: string;
  name: string;
  isChecked: boolean;
}

const useChecked = (listDocumentsTypes: documentTypeType[]): [documentTypeType[], Function] => {
  const [list, setList] = useState<documentTypeType[]>(listDocumentsTypes);

  const handleclickCheckbox = ({ target }: any): void => {
    const newList: documentTypeType[] = list.map((element: documentTypeType): documentTypeType => {
      const newElement = { ...element };

      newElement.isChecked = newElement.id === target.id ? !newElement.isChecked : newElement.isChecked;

      return newElement;
    });
    setList(newList);
  };
  return [list, handleclickCheckbox];
};

export default useChecked;
