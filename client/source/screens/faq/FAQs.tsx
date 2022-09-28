// (c) Tecnologico de Monterrey 2022, rights reserved.

import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "react-relay/hooks";

import { FAQsQuery, FAQsQuery$data } from "./__generated__/FAQsQuery.graphql";

export const FAQs = (): JSX.Element => {
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

  const { faqs } = data;

  console.debug(faqs);

  return (
    <SafeAreaView>
      <FlatList
        data={faqs}
        renderItem={(faq: any) => (
          <View>
            <View>
              <Text>Question:</Text>
              <Text className="font-bold text-black">{faq.question}</Text>
            </View>
            <View className="flex-row">
              <Text>Answer:</Text>
              <Text>{faq.answer}</Text>
            </View>
          </View>
        )}
        keyExtractor={(faq) => faq.id}
      />
    </SafeAreaView>
  );
};
