// (c) Tecnologico de Monterrey 2022, rights reserved.

interface Props {
  label: {
    id: string;
    label_name: string;
  };
}

const FilterByLabels = ({ label }: Props): JSX.Element => {
  return (
    <>
      <option value={label.id} key={label.id}>
        {label.label_name}
      </option>
    </>
  );
};

export default FilterByLabels;
