// (c) Tecnologico de Monterrey 2022, rights reserved.
import { View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

import CitationCard from "./CitationCard";
import { CitationListQuery, CitationListQuery$data } from "./__generated__/CitationListQuery.graphql";

const CitationList = () => {
  const data_Citation_list: CitationListQuery$data = useLazyLoadQuery<CitationListQuery>(
    graphql`
      query CitationListQuery {
        citationsActive {
          title
          id
          description
          end_date
        }
      }
    `,
    {},
  );
  return (
    <View className="pt-2">
      <FlatList
        data={data_Citation_list?.citationsActive}
        renderItem={({ item }) => <CitationCard data_citation={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CitationList;
