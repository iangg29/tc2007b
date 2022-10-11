// (c) Tecnologico de Monterrey 2022, rights reserved.

import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "react-relay/hooks";

import { FAQsQuery, FAQsQuery$data } from "./__generated__/FAQsQuery.graphql";


const FAQs = (): JSX.Element => {
  const data: FAQsQuery$data = useLazyLoadQuery<FAQsQuery>(
    graphql`
      query FAQsQuery {
        faqs {
          id
          question
          answer
          visible
          created_at
        }
      }
    `,
    {},
  );

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={data?.faqs}
          renderItem={({ item }) => (
            <View className="p-2">
              <View className="px-4">
                <Text>Question:</Text>
                <TouchableOpacity className="bg-blue-500 p-2 rounded-lg">
                  <Text className="text-white text-lg text-center">{item.question}</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row">
                <Text>Answer:</Text>
                <Text>{item.answer}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
};

export default FAQs;
