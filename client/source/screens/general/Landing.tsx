import { Text, View } from "react-native";
import { API_URL } from "@env";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { LandingQuery, LandingQuery$data } from "./__generated__/LandingQuery.graphql";

const Landing = () => {
  const result: LandingQuery$data = useLazyLoadQuery<LandingQuery>(
    graphql`
      query LandingQuery {
        users {
          id
          name
          first_lastname
          email
          created_at
        }
      }
    `,
    {},
  );

  console.log(result);

  return (
    <View>
      <Text>This is the landing page</Text>
      <View className="flex-row justify-between mx-10">
        <Text>The env variable is</Text>
        <Text>{`${API_URL}`}</Text>
      </View>
    </View>
  );
};

export default Landing;
