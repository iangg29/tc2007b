// (c) Tecnologico de Monterrey 2022, rights reserved.
import { View, FlatList } from "react-native";

import ApplicationCard from "./ApplicationCard";

interface Props {
  applicationByUserID: any;
}

const ApplicationList = ({ applicationByUserID }: Props) => {
  return (
    <View>
      <FlatList
        data={applicationByUserID}
        renderItem={({ item }) => <ApplicationCard title={item.title} status={item?.applicationStatus} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ApplicationList;
