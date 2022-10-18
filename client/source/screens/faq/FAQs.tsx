// (c) Tecnologico de Monterrey 2022, rights reserved.

import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "react-relay/hooks";
import * as React from 'react';
import { List } from 'react-native-paper';


import { FAQsQuery, FAQsQuery$data } from "./__generated__/FAQsQuery.graphql";
import { fontScale } from "nativewind";

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

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View className="p-5">
            <List.Section>
              {data.faqs.map((item, index) => (
                <List.Accordion
                  titleStyle={{
                    textAlign: "justify",
                    fontSize: 18,
                  }}
                  style={{ borderRadius: 20, 
                    backgroundColor: '#6082B6',
                     marginBottom:16, 
                     justifyContent: "center", 
                     alignItems: "center",}}
                  titleNumberOfLines={10}
                  key={index}
                  title={<Text className="text-white">{item.question}</Text>}
                  left={props => <List.Icon {...props} icon="frequently-asked-questions" color="white" />}>
                  <List.Item
                    titleStyle={{
                      textAlign: "justify",
                      fontSize: 15,
                    }}
                    left={props => <List.Icon {...props} icon="" color="black" />}
                    right={props => <List.Icon {...props} icon="" color="black" />}
                    style={{ backgroundColor: 'white', alignItems: "center", justifyContent: "center" }}
                    titleNumberOfLines={30}
                    key={item.id} title={<Text className="italic">{item.answer}</Text>} />
                </List.Accordion>
              ))}

            </List.Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FAQs;
