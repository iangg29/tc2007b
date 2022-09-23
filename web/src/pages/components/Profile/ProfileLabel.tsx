// (c) Tecnologico de Monterrey 2022, rights reserved.

interface props {
  field: string;
  value: any;
}

const ProfileLabel = ({ field, value }: props): JSX.Element => {
  return (
    <div className=" w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">{field}</label>
      <p className="appearance-none block w-2/3 bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-2 px-4 leading-tight focus:outline-none  focus:border-gray-500 text-xl">
        {value}
      </p>
    </div>
  );
};

export default ProfileLabel;
