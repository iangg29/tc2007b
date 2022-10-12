// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View, Text } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import UserDocs from "../../components/profile/UserDocs";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import { ProfileDocsListQuery, ProfileDocsListQuery$data } from "./__generated__/ProfileDocsListQuery.graphql";

const ProfileDocsListList = (): JSX.Element => {
  const user: any = useAppSelector(selectUser);

  const userDocuments: ProfileDocsListQuery$data = useLazyLoadQuery<ProfileDocsListQuery>(
    graphql`
      query ProfileDocsListQuery($user_id: ID!) {
        findDocumentsByUserID(user_id: $user_id) {
          id
          file_name
          url
          updated_at
        }
      }
    `,
    { user_id: user.id },
    { fetchPolicy: "network-only" },
  );

  const empty = userDocuments.findDocumentsByUserID?.length === 0;

  return (
    <View className="flex items-center">
      {empty ? (
        <Text className="text-blue-600 text-xl text-center font-semibold pt-10">
          No existen documentos relacionados al usuario
        </Text>
      ) : (
        <>
          <Text className="text-blue-600 text-xl font-semibold pt-10">Documentos</Text>
          {userDocuments.findDocumentsByUserID.map((item) => (
            <UserDocs key={item.id} filename={item.file_name} updated={item.updated_at} link={item.url} />
          ))}
          <Text>{"\n"}</Text>
        </>
      )}
    </View>
  );
};

export default ProfileDocsListList;
