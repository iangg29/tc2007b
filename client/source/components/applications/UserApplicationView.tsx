// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Text, View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

import ApplicationList from "./ApplicationList";

const UserApplicationView = () => {
  const context_id = "bcb1f0b7-fbd1-4752-8199-2238e298957a";
  const data_application_list: any = useLazyLoadQuery(
    graphql`
      query UserApplicationViewQuery {
        users {
          id
        }
      }
    `,
    {},
  );
  const mydata: any = data_application_list;
  return (
    <View className=" pl-2">
      <Text className=" text-4xl text-indigo-500 font-semibold py-4">Mis solicitudes</Text>
      <View>
        <ApplicationList applicationsInfo={mydata.applicationsByUserID} />
      </View>
    </View>
  );
};

export default UserApplicationView;
