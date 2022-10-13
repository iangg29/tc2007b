import React, { useState} from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { graphql, useMutation } from "react-relay";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import { UploadImageMutation } from "./__generated__/UploadImageMutation.graphql";

interface Props {
    profileImg: string;
}

const UploadImage = ({ profileImg }: Props): JSX.Element => {

    const user: any = useAppSelector(selectUser);

    const [commitMutation] = useMutation<UploadImageMutation>(
        graphql`
          mutation UploadImageMutation(
            $user_id: ID!
            $profile_img: String!
          ) {
            updateProfileImg(
              user_id: $user_id
              profile_img: $profile_img
            ) {
              profile_img
            }
          }
        `,
    );


    const [image, setImage] = useState(null);

    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));
        if (!_image.cancelled) {
            setImage(_image.uri);
            //Upload Profile Image
            commitMutation({
                variables: {
                    user_id: user.id as unknown as string,
                    profile_img : _image.uri as unknown as string,
                },
                onCompleted: () => {
                    console.debug("Profile picture update completed");
                },
                onError: () => {
                    console.debug("error :(");
                },
            });
        } else {
            console.debug("error :( x2");
        }
    };

    {
        profileImg === "" ? profileImg = "../../assets/dProfile.png" : profileImg
    }

    return (
        <View style={imageUploaderStyles.container}>
            {
                image ? <Image source={{ uri: image }} style={{ width: 180, height: 180 }} /> :
                    <Image source={{ uri: profileImg }} style={{ width: 180, height: 180 }} />
            }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                    <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const imageUploaderStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 180,
        width: 180,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    }
})

export default UploadImage;