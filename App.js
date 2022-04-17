import React, { Fragment, Component } from 'react';
import * as ImagePicker from "react-native-image-picker"
import * as RNFS from 'react-native-fs';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }


launchImageLibrary = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      let imgPath = response
      
      RNFS.copyFile(imgPath.uri, "/Users/rishabhchhabra/Documents/hack/Scolio/assets/scoliosis.jpg")
                .then(res => {})
                .catch(err => {
                    console.log('ERROR: image file write failed!!!');
                    console.log(err.message, err.code);
      });
    }
  });

}
renderFileData() {
  if (this.state.fileData) {
    return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
      style={styles.images}
    />
  } else {
    return <Image source={require('./assets/dummy.png')}
      style={styles.images}
    />
  }
}

renderFileUri() {
  if (this.state.fileUri) {
    return <Image
      source={{ uri: this.state.fileUri }}
      style={styles.images}
    />
  } else {
    return <Image
      source={require('./assets/galeryImages.jpg')}
      style={styles.images}
    />
  }
}
render() {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera and Gallery</Text>
          <View style={styles.ImageSections}>
            <View>
              {this.renderFileData()}
              <Text  style={{textAlign:'center'}}>Original Image</Text>
            </View>
            <View>
              {this.renderFileUri()}
              <Text style={{textAlign:'center'}}>Returned Image</Text>
            </View>
          </View>

            <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
              <Text style={styles.btnText}>Use Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
              <Text style={styles.btnText}>Use Image Library</Text>
            </TouchableOpacity>
          </View>

      </SafeAreaView>
    </Fragment>
  );
}
};

const styles = StyleSheet.create({
scrollView: {
  backgroundColor: Colors.lighter,
},

body: {
  backgroundColor: Colors.white,
  justifyContent: 'center',
  borderColor: 'black',
  borderWidth: 1,
  height: Dimensions.get('screen').height - 20,
  width: Dimensions.get('screen').width
},
ImageSections: {
  display: 'flex',
  flexDirection: 'row',
  paddingHorizontal: 8,
  paddingVertical: 8,
  justifyContent: 'center'
},
images: {
  width: 150,
  height: 150,
  borderColor: 'black',
  borderWidth: 1,
  marginHorizontal: 3
},
btnParentSection: {
  alignItems: 'center',
  marginTop:10
},
btnSection: {
  width: 225,
  height: 50,
  backgroundColor: '#DCDCDC',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 3,
  marginBottom:10
},
btnText: {
  textAlign: 'center',
  color: 'gray',
  fontSize: 14,
  fontWeight:'bold'
}
});