import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CommonStyles from '../../common/CommonStyles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Button from '../../components/Button';
import {Colors} from '../../constants/Colors';
import HeaderComponent from '../../components/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Photo() {
  const [photoURI, setPhotoURI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = () => {
    setIsLoading(true);
    const unsubscribe = firestore()
      .collection('photos')
      // .orderBy('created', 'asc')
      .onSnapshot(
        querySnapshot => {
          const fetchedPhotos = [];
          querySnapshot.forEach(doc => {
            fetchedPhotos.push({id: doc.id, ...doc.data()});
          });
          setPhotos(fetchedPhotos);
          setIsLoading(false);
        },
        error => {
          console.error('Error fetching photos:', error);
          // Handle the error here (e.g., show an error message to the user)
        },
      );

    return () => unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = fetchPhotos();
    return unsubscribe;
  }, []);

  const selectPhoto = async sourceType => {
    try {
      let image;

      if (sourceType === 'gallery') {
        image = await ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: true,
          cropperCircleOverlay: true,
          cropperStatusBarColor: 'black',
          cropperToolbarColor: 'black',
          cropperActiveWidgetColor: 'white',
          cropperToolbarWidgetColor: 'white',
          cropperToolbarTitle: 'Crop Image',
        });
      } else if (sourceType === 'camera') {
        image = await ImagePicker.openCamera({
          width: 200,
          height: 200,
          cropping: true,
          cropperCircleOverlay: true,
          cropperStatusBarColor: 'black',
          cropperToolbarColor: 'black',
          cropperActiveWidgetColor: 'white',
          cropperToolbarWidgetColor: 'white',
          cropperToolbarTitle: 'Crop Image',
        });
      }

      if (image.path) {
        setPhotoURI(image.path);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };

  const handleUploadPhoto = async () => {
    setIsLoading(true);

    try {
      // Upload photo to Firebase Storage
      const imageName = photoURI.substring(photoURI.lastIndexOf('/') + 1);
      const reference = storage().ref(`photos/${imageName}`);
      await reference.putFile(photoURI);

      // Get download URL of uploaded photo
      const downloadURL = await reference.getDownloadURL();

      // Save download URL to Firestore
      await firestore().collection('photos').add({url: downloadURL});
      setIsLoading(false);

      Alert.alert('Success', 'Photo uploaded successfully');
      fetchPhotos();
      setPhotoURI(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Error', 'Failed to upload photo');
      setIsLoading(false);
      setPhotoURI(null);
    }
  };

  const handleSelectOption = () => {
    Alert.alert(
      'Select Photo Source',
      'Choose where to select the photo from:',
      [
        {text: 'Camera', onPress: () => selectPhoto('camera')},
        {text: 'Gallery', onPress: () => selectPhoto('gallery')},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const deletePhoto = async photoId => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this photo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              setIsLoading(true);
              const photo = photos.find(p => p.id === photoId);
              if (!photo) {
                throw new Error('Photo not found');
              }
              const storageRef = storage().refFromURL(photo.url);
              await storageRef.delete();
              await firestore().collection('photos').doc(photoId).delete();
              setIsLoading(false);
              Alert.alert('Success', 'Photo deleted successfully');
              fetchPhotos();
            } catch (error) {
              console.error('Error deleting photo:', error);
              Alert.alert('Error', 'Failed to delete photo');
              setIsLoading(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <HeaderComponent title={'Photos'} />
      {isLoading && (
        <View style={CommonStyles.overlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <TouchableOpacity
        style={{paddingTop: '10%', alignItems: 'center'}}
        onPress={handleSelectOption}>
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 200,
          }}>
          {!photoURI && (
            <Text
              style={{
                color: Colors.whiteColor,
                fontWeight: '600',
                fontSize: 20,
              }}>
              Select Photo
            </Text>
          )}
          {photoURI && (
            <Image
              source={{uri: photoURI}}
              style={{
                width: 150,
                height: 150,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 200,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '50%',
          height: '25%',
          paddingTop: '5%',
          alignSelf: 'center',
        }}>
        <Button
          isDisabled={!photoURI}
          title={'Upload Photo'}
          onPress={handleUploadPhoto}
        />
      </View>

      <View
        style={{
          width: '100%',
          height: '50%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.blackColor,
            fontWeight: '600',
            fontSize: 15,
            marginBottom: '3%',
          }}>
          List of Photos fetched from Firestore
        </Text>
        {/* Render the list of photos */}

        <FlatList
          data={photos}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const fileName = item.url.split('%2F').pop().split('?')[0]; // Calculate fileName for each item
            return (
              <TouchableOpacity
                onPress={() => deletePhoto(item.id)}
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{width: '30%', textAlign: 'center'}}>
                  {fileName}
                </Text>
                <Image
                  source={{uri: item.url}}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 200,
                    borderWidth: 2,
                    borderColor: Colors.blackColor,
                    marginLeft: 10, // Add margin between text and image
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
