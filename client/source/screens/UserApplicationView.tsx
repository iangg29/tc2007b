import { Text, View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

import ApplicationList from "./general/components/Application/ApplicationList";

const UserApplicationView = () => {
  const context_id: string = "bcb1f0b7-fbd1-4752-8199-2238e298957a";
  //const data_application_list: UserApplicationViewQuery$data = useLazyLoadQuery<UserApplicationViewQuery>(
  const data_application_list: any = useLazyLoadQuery(
    graphql`
      query UserApplicationViewQuery($user_id: ID!) {
        applicationsByUserID(user_id: $user_id) {
          id
          title
        }
      }
    `,
    { user_id: context_id },
  );
  const mydata: any = data_application_list;
  return (
    <View className=" pl-2">
      <Text className=" text-4xl text-indigo-500 font-semibold py-4">Mis solicitudes</Text>
      <View>
        <ApplicationList applicationsInfo={mydata.applicationsByUserID}></ApplicationList>
      </View>
    </View>
  );
};

export default UserApplicationView;
