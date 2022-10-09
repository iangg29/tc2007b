// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Text, View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

import CitationCard from "./CitationCard";

const CitationList = () => {
  const data_Citation_list: any = useLazyLoadQuery(
    graphql`
      query CitationListQuery {
        citations {
          title
          id
        }
      }
    `,
    {},
  );
  return (
    <View>
      <Text>This is the Citation List page: </Text>
      <FlatList
        data={data_Citation_list?.citations}
        renderItem={({ item }) => <CitationCard id={item.id} title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CitationList;
