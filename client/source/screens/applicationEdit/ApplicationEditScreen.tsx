// (c) Tecnologico de Monterrey 2022, rights reserved.
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ApplicationEditScreenQuery, ApplicationEditScreenQuery$data} from "/__generated__/EditApplicationScreenQuery.graphql";

// Screen to edit an application [send to corrections]
const ApplicationEditScreen = ({route}: any): JSX.Element => {
  const { itemId } = route.params;
  
  const data: ApplicationEditScreenQuery$data = useLazyLoadQuery<ApplicationEditScreenQuery>(
    graphql`
      query ApplicationEditScreenQuery($id: ID!) {
        applicationByID(id: $id) {
          id
          title
          description
          support
          deadline
          start_time
          end_time
        }
      }
    `,
    { id: itemId },
  );

  return (
    <SafeAreaView>
      <View>
        <Text>Edición de la solicitud</Text>
        {/* Basic Info of Application */}
        {/* Show name, image, and some indications of needed changes on documents */}

        {/* Documents sent to corrections */}
        {/* Variant doc review to re-upload a document */}

        {/* Accept / Cancel changes */}
        {/* Buttons to Accept or cancel to which we have to change once again the application status */}

      </View>
    </SafeAreaView>
  );
}

export default ApplicationEditScreen;
