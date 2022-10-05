// (c) Tecnologico de Monterrey 2022, rights reserved.
import { View, FlatList } from "react-native";
import ApplicationCard from "./ApplicationCard";

interface Props {
  applicationsInfo: any;
}

const ApplicationList = ({ applicationsInfo }: Props) => {
  return (
    <View>
      <FlatList
        data={applicationsInfo}
        renderItem={({ item }) => <ApplicationCard id={item.id} title={item.title}></ApplicationCard>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ApplicationList;
