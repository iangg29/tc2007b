// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

import ApplicationList from "../../components/applications/ApplicationList";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import { ApplicationsScreenQuery, ApplicationsScreenQuery$data } from "./__generated__/ApplicationsScreenQuery.graphql";

const ApplicationsScreen = (): JSX.Element => {
  const user: any = useAppSelector(selectUser);
  const user_id = user.id;

  const data: ApplicationsScreenQuery$data = useLazyLoadQuery<ApplicationsScreenQuery>(
    graphql`
      query ApplicationsScreenQuery($user_id: ID!) {
        applicationByUserID(user_id: $user_id) {
          id
          application_title
          applicationStatus {
            status_name
          }
          citation {
            citation_title
          }
        }
      }
    `,
    { user_id },
  );
  const { applicationByUserID } = data;

  return (
    <View className=" pl-2 pt-2">
      <View>
        <ApplicationList applicationByUserID={applicationByUserID} />
      </View>
    </View>
  );
};

export default ApplicationsScreen;
