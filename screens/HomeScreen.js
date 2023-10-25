// HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/images/background-image.jpg')} style={styles.backgroundimg}>
      <View style={styles.container}>
        <View style={styles.centerwrapper}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          {/* <Text style={styles.tagtext}>Wellness at Your Fingertips</Text> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllPatientsScreen')} >
              <Text style={styles.buttonText}>View All Patient</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.button , styles.nobgbutton]} onPress={() => navigation.navigate('AddPatient')} >
              <Text style={[styles.buttonText, styles.nobgbuttontext]}>Add New Patient</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundimg: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerwrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 150,
    marginBottom: 20,
    position: 'absolute',
    top: 150,
  },
  tagtext: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 30,
  },
  smallImage: {
    height: 90,
    marginTop: 60,
    marginBottom: 80
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: '#6B81DC',
    paddingTop: 12, 
    paddingBottom: 12, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B81DC',
    marginBottom: 10,
    marginTop: 10,
    width: 330,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center'
  },
  nobgbutton: {
    backgroundColor: 'transparent',
  },
  nobgbuttontext: {
    color: '#6B81DC',
    fontWeight: 600,
  }
});
export default HomeScreen;
