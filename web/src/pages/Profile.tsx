// (c) Tecnologico de Monterrey 2022, rights reserved.

import ProfileInfo from "./components/Profile/ProfileInfo";

const Profile = (): JSX.Element => {
  return (
    <div>
      <ProfileInfo
        info={{
          name: "Tavo",
          first_lastname: "Perez",
          second_lastname: "Garcia",
          cellphone: "442 210 20 59",
          email: "Tavo@gmail.com",
          status: 0,
        }}
        image="https://scontent.fqro3-1.fna.fbcdn.net/v/t1.6435-1/39454471_119272802347976_7376784494713372672_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=_-IdX4vGZ1wAX-H52Ql&_nc_oc=AQnJ5J1oU2CVjJWregagaFOi93BQOWRCokSA94ZL8gP_9AkMMeMHlNEhCy3qoxXiblKnmCQvPWC3edCKHywbvU97&_nc_ht=scontent.fqro3-1.fna&oh=00_AT-Y7Hqr2QnZWrjNZIRD818CZ4mnwk8i-BUEpqAWJyPoKA&oe=634D653D"
      />
    </div>
  );
};

export default Profile;
