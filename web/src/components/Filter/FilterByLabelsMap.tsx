// (c) Tecnologico de Monterrey 2022, rights reserved.

import FilterByLabels from "./FilterByLabels";

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
      <FilterByLabels label={element.labels} />
    </>
  );
};

export default FilterByLabelsMap;
