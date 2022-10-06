// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

import ApplicationStatusView from "../../components/applications/ApplicationStatusView";
import { ApplicationsScreenQuery, ApplicationsScreenQuery$data } from "./__generated__/ApplicationsScreenQuery.graphql";

const ApplicationsScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const context_id = "bcb1f0b7-fbd1-4752-8199-2238e298957a";
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
        <ApplicationStatusView status="" title="title" />
      </View>
    </View>
  );
};

export default ApplicationsScreen;
