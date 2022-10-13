// (c) Tecnologico de Monterrey 2022, rights reserved.
import React from "react";
import { View } from "react-native";

// Page to edit an application [send to corrections]
function EditApplication() {
  const exampleDocuments = [
    { file_name: "document1", updateAt: "06/12/22", url: ""},
    { file_name: "document2", updateAt: "06/12/22", url: ""}];
  return (
    <>
    <View>
      {/* Basic Info of Application */}
      {/* Show name, image, and some indications of needed changes on documents */}

      {/* Documents sent to corrections */}
      {/* Variant doc review to re-upload a document */}

      {/* Accept / Cancel changes */}
      {/* Buttons to Accept or cancel to which we have to change once again the application status */}

    </View>

    </>
  );
}

export default EditApplication;
