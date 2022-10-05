// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View, Text } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import ApplicationStatusView from "../../components/applications/ApplicationStatusView";
import { ApplicationsScreenQuery, ApplicationsScreenQuery$data } from "./__generated__/ApplicationsScreenQuery.graphql";
import { useNavigation } from "@react-navigation/native";
const navigation = useNavigation();

const ApplicationsScreen = ({ navigation }): JSX.Element => {
  const context_id: string = "bcb1f0b7-fbd1-4752-8199-2238e298957a";
  const data_application_list: ApplicationsScreenQuery$data = useLazyLoadQuery<ApplicationsScreenQuery>(
    graphql`
      query ApplicationsScreenQuery {
        users {
          id
        }
      }
    `,
    {},
  );

  return (
    <View className=" pl-2">
      <Text className=" text-4xl text-indigo-500 font-semibold py-4">Mis solicitudes</Text>
      <View>
        <ApplicationStatusView status={""} title={"title"}></ApplicationStatusView>
      </View>
    </View>
  );
};

export default ApplicationsScreen;
