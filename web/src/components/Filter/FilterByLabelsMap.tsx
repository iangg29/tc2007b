// (c) Tecnologico de Monterrey 2022, rights reserved.

import FilterByLabels from "./FilterByLabels";
import { useMemo } from "react";

interface label {
  id: string;
  name: string;
}

interface Props {
  element: {
    labels: [label];
  };
}

const FilterByLabelsMap = ({ element }: Props): JSX.Element => {
  return (
    <>
      {useMemo(
        () => (
          <FilterByLabels label={element.labels} />
        ),
        [element],
      )}
    </>
  );
};

export default FilterByLabelsMap;
