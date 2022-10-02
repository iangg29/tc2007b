import { Text, View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import CitationCard from "./CitationCard";

const CitationList = () => {
  const context_id: string = "bcb1f0b7-fbd1-4752-8199-2238e298957a";

  //const data_Citation_list: CitationListQuery$data = useLazyLoadQuery<CitationListQuery>(
  const data_Citation_list: any = useLazyLoadQuery(
    graphql`
      query CitationListQuery($user_id: ID!) {
        applicationsByUserID(user_id: $user_id) {
          id
          title
        }
      }
    `,
    { user_id: context_id },
  );
  const mydata: any = data_Citation_list;

  return (
    <View>
      <Text>This is the Citation List page: </Text>
      <FlatList
        data={mydata.applicationsByUserID}
        renderItem={({ item }) => <CitationCard id={item.id} title={item.title}></CitationCard>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CitationList;
