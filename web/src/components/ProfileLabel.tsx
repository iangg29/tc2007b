// (c) Tecnologico de Monterrey 2022, rights reserved.

interface props {
  asunto: string;
  value: any;
}

const ProfileLabel = ({ asunto, value }: props): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <p>{asunto}</p>
      <p>{value}</p>
    </div>
  );
};

export default ProfileLabel;
