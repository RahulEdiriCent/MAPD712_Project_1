// PatientDetailed.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ViewClinicalData = ({ navigation, route  }) => {
    const {patientId} = route.params;
    const FETCHAPILINK = 'https://9f1f-142-112-133-137.ngrok.io/patients/';
    const [clinicalData, setClinicalData] = useState();
    //
  const [chosenDateFirst, setChosenDateFirst] = useState(); //new Date()
  const [chosenDateSecond, setChosenDateSecond] = useState(); //new Date()
  const [showDatePickerFirst, setShowDatePickerFirst] = useState(false);
  const [showDatePickerSecond, setShowDatePickerSecond] = useState(false);

/*
  const onChangefirst = (event, selectedDate) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePickerFirst(false);
    setChosenDateFirst(currentDate);
  };

  const onChangesecond = (event, selectedDate) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePickerSecond(false);
    setChosenDateSecond(currentDate);
  };
*/

 //Fetch all patients functionality integration with 713 API--
 const getAllClinicalData = async()=>{
    //replace with proper api ip
    await fetch(FETCHAPILINK + patientId + "/tests", {
      method: 'GET' //use get method
    }).then((response) => response.json()).then((returnedJSON) => {
     console.log(returnedJSON);
     const temp_data_hold = returnedJSON.map(item => item);
      setClinicalData(temp_data_hold);
     })
    .catch((getAllClinicalDataError) => {
      console.log(getAllClinicalDataError);     
    })
  }

  const deleteAllPatientClinicalTestData = async ()=>{
    await fetch(FETCHAPILINK + patientId + "/tests", {
      method: 'DELETE'
    }).then((response) => response.json()).then((returnedJSON) => {
      alert("!All Patient Test Data Has Been Deleted!")//alert to indicate files have been deleted
      console.log(returnedJSON);
      setClinicalData(); //update state to refresh page to show that data has been deleted
     }).catch((DeleteAllError) => {
      console.log(DeleteAllError);     
    })
  }

  //delete one clinical test record for pateint using id functionality integration with 713 API--
  const deleteOneClinicalTestRecord = async (tid)=>{
    await fetch(FETCHAPILINK + patientId + "/tests/" + tid, {
      method: 'DELETE'
    }).then((response) => response.json()).then((returnedJSON) => {
      alert("!Test with Id: "+ tid +", has beeen Deleted!")//alert to indicate files have been deleted
      console.log(returnedJSON);
      //navigation.goBack()
      getAllClinicalData();//update state to refresh page to show that data has been deleted
     }).catch((DeleteOneError) => {
      console.log(DeleteOneError);     
    })
  }


  useEffect(()=>{
    getAllClinicalData();
  }, []);


   {/*Use to display each found patient in the list*/}
   const ClinicalTestDisplayCard = ({test}) =>(
    <View style={styles.card}>
        {/*  Single Card */}
        <View style={styles.boxshadowcss}>
            {/* Test Id */}
            <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Test Id: </Text>
                <Text style={styles.title}>{test.testId}</Text>
            </View>


            {/* Patient Id */}
            {/* <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Patient Id: {test.patientId}</Text>
            </View> */}

            {/* Status */}
            <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Test Result Status: </Text>
                <Text style={styles.title}>{test.status}</Text>
            </View>

            {/* Test Date */}
            <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Test Date: </Text>
                <Text style={styles.title}>{test.testDate}</Text>
            </View>

            {/* Nurse */}
            <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Nurse: </Text>
                <Text style={styles.title}>{test.nurse_name}</Text>
            </View>

            {/* Type */}
            <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Type: </Text>
                <Text style={styles.title}>{test.type}</Text>
            </View>

            {/* Category */}
            <View style={[styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.title}>Category: </Text>
                <Text style={styles.title}>{test.category}</Text>
            </View>

            {/* Readings */}
            <Text style={styles.title}>Readings:</Text>
            <FlatList
                data={test.readings.map(([readingValue_1, readingValue_2]) => `${readingValue_1} : ${readingValue_2}`)}
                renderItem={({item}) => <TestReadingsDisplay readings={item}  />}
                keyExtractor={(item, index) => index.toString()}
            /> 

            {/* Delete Test */}
            <View style={[styles.deletedatewrapper, styles.singledetailwrapper, styles.flexcss]}>
                <Text style={styles.testdates}>{test.testDate}</Text>
                <TouchableOpacity onPress={()=> deleteOneClinicalTestRecord(test.testId)}>
                    <Image source={require('../assets/images/purple-delete-icon.png')} style={styles.ppldeleteicon} />
                </TouchableOpacity>
            </View> 
        </View>
    </View>
   );

    const TestReadingsDisplay = ({readings}) =>(
        <View style={[styles.singledetailwrapper, styles.flexcss]}>
            <Text style={styles.title}>{readings}</Text>
        </View>  
    )

  return (
        <View style={styles.innercontainer}>
            {/* Deletebutton */}
            <View style={styles.deletebtncontainer}>
                <TouchableOpacity style={styles.deletebutton} onPress={()=>deleteAllPatientClinicalTestData()}>
                    <Image source={require('../assets/images/delete-icon.png')} style={styles.deleteicon} />
                    <Text style={styles.dltbuttonText}>Delete All Tests </Text>
                </TouchableOpacity>
            </View>

            {/* Date sorting 
            <View style={[styles.datepickercontainer, styles.boxshadowcss]}>
                {/*<DateTimePicker
                    value={chosenDateFirst}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangefirst}
                    style={styles.datePicker}
                    textColor="#FF0000" // Customize text color
                    testID="dateTimePicker"
                />
                <TextInput
                        style={styles.input}
                        value={chosenDateFirst}
                        onChangeText={(text) => setChosenDateFirst(text)}
                        placeholder="First Date"
                    />
               <Text style={[styles.boldtext]}>To</Text> 
               {/*<DateTimePicker
                    value={chosenDateSecond}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangesecond}
                    style={styles.datePicker}
                    textColor="#FF0000" // Customize text color
                    testID="dateTimePicker"
            />
            <TextInput
                        style={styles.input}
                        value={chosenDateSecond}
                        onChangeText={(text) => setChosenDateSecond(text)}
                        placeholder="Second Date"
                    />
            </View>
            */}
            {/* List section */}
            <View style={styles.cardwrapper} > 

                <FlatList
                data={clinicalData}
                renderItem={({item}) => < ClinicalTestDisplayCard test={item}  />}
                keyExtractor={item => item._id}
                />  
            </View>
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        // minHeight: 500
    },
    innercontainer: {
        padding: 15,
        marginBottom: 150
    },
    boxshadowcss: {
        backgroundColor: '#FDFCFA',
        borderRadius: 10,
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
    // Detele Button css
    deletebtncontainer: {
        width:'100%',
        display: 'flex',
        justifyContent: 'flex-end',
        // backgroundColor: 'red',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 8,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: '#eac8cc'
    },
    deletebutton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        alignItems: 'center',
        width: 'auto',
        paddingTop: 7,
        paddingBottom: 7,
    },
    deleteicon: {
        paddingRight: 10
    },
    dltbuttonText: {
        color: '#323232',
        fontSize: 12,
        fontWeight: '700',
        paddingLeft:10,
    },
    // Banner css
    patientname: {
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 6
    },
    patientid: {
        fontSize: 16,
        color: '#858585'
    },
    boldtext: {
        fontWeight: '700'
    },
    patientimage: {
        width: '100%',
        // height: 220,
        borderRadius: 10,
    },
    // Main css section
    singledetailwrapper: {
        marginTop: 8,
        marginBottom: 8
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
    ppldeleteicon: {
        height: 25,
        width: 25
    },
    testdates: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    deletedatewrapper: {
        paddingTop: 15
    },
    datepickercontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    datePicker: {
        width: '39%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#6B81DC',
    },
});

export default ViewClinicalData;
