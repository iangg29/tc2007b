// (c) Tecnologico de Monterrey 2022, rights reserved.

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
    </>
  );
};

export default FilterByLabels;
