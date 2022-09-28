import { Text, View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import ApplicationCard from "./ApplicationCard";
import { ApplicationListQuery, ApplicationListQuery$data } from "../__generated__/ApplicationListQuery.graphql";

const ApplicationList = () => {
  const context_id: string = "bcb1f0b7-fbd1-4752-8199-2238e298957a";
  const data_application_list: ApplicationListQuery$data = useLazyLoadQuery<ApplicationListQuery>(
    graphql`
      query ApplicationListQuery($user_id: ID!) {
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
    <View>
      <Text>LIST:</Text>
      <Text>This is the Application List page</Text>
      <FlatList
        data={mydata.applicationsByUserID}
        renderItem={({ item }) => <ApplicationCard id={item.id} title={item.title}></ApplicationCard>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ApplicationList;
