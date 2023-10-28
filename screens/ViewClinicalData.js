// PatientDetailed.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ViewClinicalData = ({ navigation }) => {
  const [chosenDateFirst, setChosenDateFirst] = useState(); //new Date()
  const [chosenDateSecond, setChosenDateSecond] = useState(); //new Date()
  const [showDatePickerFirst, setShowDatePickerFirst] = useState(false);
  const [showDatePickerSecond, setShowDatePickerSecond] = useState(false);

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
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innercontainer}>
            {/* Deletebutton */}
            <View style={styles.deletebtncontainer}>
                <TouchableOpacity style={styles.deletebutton}>
                    <Image source={require('../assets/images/delete-icon.png')} style={styles.deleteicon} />
                    <Text style={styles.dltbuttonText}>Delete All Tests </Text>
                </TouchableOpacity>
            </View>

            {/* Banner Section */}
            <View style={[styles.bannercontainer, styles.boxshadowcss]}>
                <Image source={require('../assets/images/patient_detailed_image.png')} style={styles.patientimage} />
                <Text style={[styles.patientname, styles.boldtext]}>Jenny Wilson</Text>
                <Text style={styles.patientid}>ID: <Text>15018</Text></Text>
            </View>

            {/* Date sorting */}
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
                />*/}
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
            />*/}
            <TextInput
                        style={styles.input}
                        value={chosenDateSecond}
                        onChangeText={(text) => setChosenDateSecond(text)}
                        placeholder="Second Date"
                    />
            </View>

            {/* List section */}
            <View style={styles.cardwrapper} >
                {/*  Single Card */}
                <View style={styles.boxshadowcss}>
                    {/* Blood Pressure */}
                    <Text style={styles.title}>Blood Pressure: </Text>
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Systolic | Diastolic</Text>
                        <Text style={styles.value}>120 | 80</Text>   
                    </View>

                    {/* Respirator */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Respirator</Text>
                        <Text style={styles.value}>--</Text>   
                    </View>

                    {/* Blood Oxygen */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Blood Oxygen</Text>
                        <Text style={styles.value}>97%</Text>   
                    </View>

                    {/* Heart beat */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Heart Beat</Text>
                        <Text style={styles.value}>65-72</Text>   
                    </View>
                    {/* Date */}
                    <View style={[styles.deletedatewrapper,styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.testdates}>02/23/223</Text>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/purple-delete-icon.png')} style={styles.ppldeleteicon} />
                        </TouchableOpacity>
                    </View> 
                </View>

                {/*  Single Card */}
                <View style={styles.boxshadowcss}>
                    {/* Blood Pressure */}
                    <Text style={styles.title}>Blood Pressure: </Text>
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Systolic | Diastolic</Text>
                        <Text style={styles.value}>120 | 80</Text>   
                    </View>

                    {/* Respirator */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Respirator</Text>
                        <Text style={styles.value}>--</Text>   
                    </View>

                    {/* Blood Oxygen */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Blood Oxygen</Text>
                        <Text style={styles.value}>97%</Text>   
                    </View>

                    {/* Heart beat */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Heart Beat</Text>
                        <Text style={styles.value}>65-72</Text>   
                    </View>
                    {/* Date */}
                    <View style={[styles.deletedatewrapper, styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.testdates}>02/23/223</Text>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/purple-delete-icon.png')} style={styles.ppldeleteicon} />
                        </TouchableOpacity>
                    </View> 
                </View>

                {/*  Single Card */}
                <View style={styles.boxshadowcss}>
                    {/* Blood Pressure */}
                    <Text style={styles.title}>Blood Pressure: </Text>
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Systolic | Diastolic</Text>
                        <Text style={styles.value}>120 | 80</Text>   
                    </View>

                    {/* Respirator */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Respirator</Text>
                        <Text style={styles.value}>--</Text>   
                    </View>

                    {/* Blood Oxygen */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Blood Oxygen</Text>
                        <Text style={styles.value}>97%</Text>   
                    </View>

                    {/* Heart beat */}
                    <View style={[styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.title}>Heart Beat</Text>
                        <Text style={styles.value}>65-72</Text>   
                    </View>

                    {/* Date */}
                    <View style={[styles.deletedatewrapper, styles.singledetailwrapper, styles.flexcss]}>
                        <Text style={styles.testdates}>02/23/223</Text>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/purple-delete-icon.png')} style={styles.ppldeleteicon} />
                        </TouchableOpacity>
                    </View> 
                </View>
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
        height: 220,
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
