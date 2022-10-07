// (c) Tecnologico de Monterrey 2022, rights reserved.

import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";

interface label {
  id: string;
  name: string;
}

interface Props {
  element: {
    label: label;
  };
}

const FilterByLabels = ({ element }: Props): JSX.Element => {
  return (
    <>
      <DropdownItem>`${String(element.label.name)}`</DropdownItem>
    </>
  );
};

export default FilterByLabels;
