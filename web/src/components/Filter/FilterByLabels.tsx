// (c) Tecnologico de Monterrey 2022, rights reserved.

/*
import { useMemo } from "react";
*/

interface labels {
  id: string;
  name: String;
}

interface Props {
  label: labels[];
}

const FilterByLabels = ({ label }: Props): JSX.Element => {
  return (
    <>
      {label?.map((element: any) => (
        <option value={element.id} key={element.id}>
          {element.label_name}
        </option>
      ))}
      {/* {label?.map((element: any) =>
        useMemo(
          () => (
            <option value={element.id} key={element.id}>
              {element.label_name}
            </option>
          ),
          [element],
        ),
      )} */}
      {/* {useMemo(
        () =>
          label?.map((element: any) => (
            <option value={element.id} key={element.id}>
              {element.label_name}
            </option>
          )),
        [label],
      )} */}
    </>
  );
};

export default FilterByLabels;
