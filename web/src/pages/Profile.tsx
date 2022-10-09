// (c) Tecnologico de Monterrey 2022, rights reserved.

import ProfileInfo from "../components/Profile/ProfileInfo";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/slices/authSlice";

const Profile = (): JSX.Element => {
  const user: any = useAppSelector(selectUser);
  const data = {
    Nombre: user.name,
    "Apellido paterno": user.first_lastname,
    Correo: user.email,
    Telefono: user.cellphone,
  };
  return (
    <div>
      <ProfileInfo
        info={data}
        image={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
      />
    </div>
  );
};

export default Profile;
