// (c) Tecnologico de Monterrey 2022, rights reserved.

interface Props {
  label: {
    id: string;
    label_name: string;
  };
}

const FilterByLabels = ({ label }: Props): JSX.Element => {
  console.debug(label);
  return (
    <>
      <option value={label.id} key={label.id}>
        {label.label_name}
      </option>
    </>
  );
};

export default FilterByLabels;
