// PatientDetailed.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

const PatientDetails = ({ navigation , route }) => {
    const {patientid} = route.params;
    const FETCHAPILINK = 'https://e23f-99-211-193-59.ngrok.io/patients/';
    const [patientData, setPatientData] = useState(); 

    //Fetch all patients functionality integration with 713 API--
    const getPatientData = async()=>{
        //replace with proper api ip
        await fetch(FETCHAPILINK+patientid , {
        method: 'GET' //use get method
        }).then((response) => response.json()).then((returnedJSON) => {
        //console.log(json);
        const temp_data_hold = returnedJSON;
        setPatientData(temp_data_hold);
        })
        .catch((getAllError) => {
        console.log(getAllError);     
        })
    }

    //delete one patient record using id functionality integration with 713 API--
    const deleteOnePatientRecord = async()=>{
        
        await fetch(FETCHAPILINK+patientid, {
        method: 'DELETE'
        }).then((response) => response.json()).then((returnedJSON) => {
        alert("!Patient with Id: "+ patientid +", has beeen Deleted!")//alert to indicate files have been deleted
        console.log(returnedJSON);
        // setPatientData(); //update state to refresh page to show that data has been deleted
        backToHomePage();
        }).catch((DeleteOneError) => {
        console.log(DeleteOneError);     
        })
    }
    
    const backToHomePage = () => {
        navigation.navigate('HomeScreen')
    }

    const toClinicalDataPage = (pid) => {
        navigation.navigate('ViewClinicalData', {patientId: pid})
    }

    useEffect(()=>{
        getPatientData();
    }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {patientData ? (
        <View style={styles.innercontainer}>
            {/* Banner Section */}
            <View style={[styles.bannercontainer, styles.boxshadowcss]}>
                <Image source={require('../assets/images/patient_detailed_image.png')} style={styles.patientimage} />
                <View style={styles.flexcss}>
                    <View>
                        <Text style={[styles.patientname, styles.boldtext]}>{patientData.firstName + " " + patientData.lastName}</Text>
                        <Text style={styles.patientid}>ID: <Text>{patientData.patientId}</Text></Text>
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
                    <Text style={styles.value}>{patientData.firstName}</Text>
                </View>

                {/* lname */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Last Name: </Text>
                    <Text style={styles.value}>{patientData.lastName}</Text>
                </View>

                {/* Address */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Address: </Text>
                    <Text style={[styles.value, styles.addresswidth]}>{patientData.address}</Text>
                </View>

                {/* Gender */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Gender: </Text>
                    <Text style={styles.value}>{patientData.gender}</Text>
                </View>

                {/* Number */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Number: </Text>
                    <Text style={styles.value}>{patientData.phoneNumber}</Text>
                </View>

                {/* Email
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Email:</Text>
                    <Text style={styles.value}>{patientData.gender}</Text>
                </View> */}

                {/* DOB */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>DOB:</Text>
                    <Text style={styles.value}>{patientData.date_of_birth}</Text>
                </View>

                {/* Age */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Age:</Text>
                    <Text style={styles.value}>{patientData.age}</Text>
                </View>

                {/* Department */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Department:</Text>
                    <Text style={styles.value}>{patientData.department}</Text>
                </View>

                {/* Condition */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Condition:</Text>
                    <Text style={styles.value}>{patientData.condition}</Text>
                </View>

                {/* Doctor */}
                <View style={[styles.singledetailwrapper, styles.flexcss]}>
                    <Text style={styles.title}>Doctor:</Text>
                    <Text style={styles.value}>{patientData.doctor}</Text>
                </View>
            </View>

            {/* Tests Button Section */}
            <View style={[styles.testsbuttoncontainer, styles.flexcss, styles.boxshadowcss]}>
                <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => toClinicalDataPage(patientData.patientId)} >
                    <Text style={[styles.buttonText, styles.viewbtntxt]}>View Clinical Data</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.cardbtn,styles.removebtn]} onPress={() => navigation.navigate('AddClinicalData')} >
                    <Text style={[styles.buttonText,styles.removebtntxt]}>Add Clinical Data</Text>
                </TouchableOpacity>   
            </View>

            {/* Delete Button Section */}
            <View style={[styles.testsbuttoncontainer, styles.boxshadowcss]}>
                <TouchableOpacity style={[styles.viewbtn,styles.deletebtn]} onPress={() => deleteOnePatientRecord()}>
                    <Text style={[styles.buttonText, styles.viewbtntxt]}>Delete Patient</Text>
                </TouchableOpacity> 
            </View>
        </View>
        ) : (
            <View>
                <Text>
                    Not Found
                </Text>
            </View>
        )}
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
