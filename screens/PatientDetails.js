// PatientDetailed.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

const PatientDetails = ({ navigation }) => {
    const FETCHAPILINK = 'https://5153-99-211-193-59.ngrok.io/patients'
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innercontainer}>
            {/* Banner Section */}
            <View style={[styles.bannercontainer, styles.boxshadowcss]}>
                <Image source={require('../assets/images/patient_detailed_image.png')} style={styles.patientimage} />
                <View style={styles.flexcss}>
                    <View>
                        <Text style={[styles.patientname, styles.boldtext]}>Jenny Wilson</Text>
                        <Text style={styles.patientid}>ID: <Text>15018</Text></Text>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.editbtn,styles.viewbtn]} onPress={() => navigation.navigate('EditPatient')} >
                            <Text style={[styles.buttonText, styles.viewbtntxt]}>Edit Details</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>

            {/* Detailed Section */}
            <View style={[styles.detailedcontainer, styles.boxshadowcss]}>
                {/* Fname */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>First Name: </Text>
                    <Text style={styles.value}>Jenny</Text>
                </View>

                {/* lname */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Last Name: </Text>
                    <Text style={styles.value}>Wilson</Text>
                </View>

                {/* Address */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Address: </Text>
                    <Text style={[styles.value, styles.addresswidth]}>1087 Coldream Dr, Oshawa, ON, L1K H7U</Text>
                </View>

                {/* Gender */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Gender: </Text>
                    <Text style={styles.value}>Female</Text>
                </View>

                {/* Number */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Number: </Text>
                    <Text style={styles.value}>1342-345-456</Text>
                </View>

                {/* Email */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Email:</Text>
                    <Text style={styles.value}>demo@gmail.com</Text>
                </View>

                {/* DOB */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>DOB:</Text>
                    <Text style={styles.value}>25-03-2000</Text>
                </View>

                {/* Age */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Age:</Text>
                    <Text style={styles.value}>25</Text>
                </View>

                {/* Department */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Department:</Text>
                    <Text style={styles.value}>Dental</Text>
                </View>

                {/* Doctor */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Doctor:</Text>
                    <Text style={styles.value}>Dr. John Doe</Text>
                </View>
            </View>

            {/* Tests Button Section */}
            <View style={[styles.testsbuttoncontainer, styles.flexcss, styles.boxshadowcss]}>
                <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => navigation.navigate('ViewClinicalData')} >
                    <Text style={[styles.buttonText, styles.viewbtntxt]}>View Clinical Data</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.cardbtn,styles.removebtn]} onPress={() => navigation.navigate('AddClinicalData')} >
                    <Text style={[styles.buttonText,styles.removebtntxt]}>Add Clinical Data</Text>
                </TouchableOpacity>   
            </View>

            {/* Delete Button Section */}
            <View style={[styles.testsbuttoncontainer, styles.boxshadowcss]}>
                <TouchableOpacity style={[styles.viewbtn,styles.deletebtn]} >
                    <Text style={[styles.buttonText, styles.viewbtntxt]}>Delete Patient</Text>
                </TouchableOpacity> 
            </View>
        </View>
    </ScrollView>
    );
  };

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        minHeight: 500
    },
    innercontainer: {
        padding: 15
    },
    boxshadowcss: {
        backgroundColor: '#FDFCFA',
        borderRadius: 8,
        padding: 10,
        // Box shadow for Android
        elevation: 6,
        // Box shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginBottom: 12
    },
    detailedcontainer: {
        paddingLeft: 15, 
        paddingRight: 15, 
    },
    flexcss: {
        display: 'flex',
        flexDirection:'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    patientname: {
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 6
    },
    patientid: {
        fontSize: 16,
        color: '#858585'
    },
    editbtn: {
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6B81DC',
        paddingLeft: 8,
        paddingRight: 8
    },
    boldtext: {
        fontWeight: '700'
    },
    patientimage: {
        width: '100%',
        height: 220,
        borderRadius: 8,
    },
    singledetailwrapper: {
        marginTop: 12,
        marginBottom: 12
    },
    addresswidth: {
        width: '60%',
        textAlign: 'right'
    },
    title: {
        fontSize: 16,
        color: '#858585'
    },
    value: {
        fontSize: 16
    },
    // Button css
    testsbuttoncontainer: {
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'space-around'
    },
    cardbtn: {
        width: '47%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6B81DC',
    },
    buttonText: {
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 12
    },
    viewbtn: {
        backgroundColor: '#6B81DC'
    },
    viewbtntxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },
    removebtntxt: {
        color: '#6B81DC',
        fontSize: 14,
        fontWeight: '600'
    },
    deletebtn: {
        borderRadius: 8,
        backgroundColor: '#c30010'  
    }
});
export default PatientDetails;
