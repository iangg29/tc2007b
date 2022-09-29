import { Text, View } from "react-native";
import { API_URL } from "@env";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { LandingQuery, LandingQuery$data } from "./__generated__/LandingQuery.graphql";
import CitationList from "./components/Citation/CitationList";
import UserApplicationView from "../UserApplicationView";
import ApplicationStatusView from "../ApplicationStatusView";
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
      <ApplicationStatusView status={"finalizado"}></ApplicationStatusView>
    </View>
  );
};

export default Landing;
