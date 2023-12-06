// PatientDetailed.js
import React, { useState, useEffect } from 'react'; 
import { View, Text, Button, StyleSheet, ScrollView, TextInput, RadioForm, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup from '../components/RadioButtonGroup';

const EditPatient = ({ navigation, route }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [department, setDepartment] = useState('');
    const [doctor, setDoctor] = useState('');
    const [gender, setRadioValue] = useState('');
    const [condition, setCondition] = useState('');
    const [tests, setTests] = useState([])
    const genders= ['Male', 'Female'];
    
    // Date picker value
    const [DOB, setDOB] = useState(''); //new Date()
    const [showDatePicker, setShowDatePicker] = useState(false);

    const {patientid} = route.params;
    const FETCHAPILINK = 'https://mapd713-api-group13.onrender.com/patients/';
    const [patientData, setPatientData] = useState(); 

    //Fetch all patients functionality integration with 713 API--
    const getPatientData = async()=>{
        //replace with proper api ip
        await fetch(FETCHAPILINK+patientid , {
        method: 'GET' //use get method
        }).then((response) => response.json()).then((returnedJSON) => {
        //console.log(json);
        console.log(returnedJSON)
        console.log("")
        const temp_data_hold = returnedJSON;
        setPatientData(temp_data_hold);
        setFirstname(temp_data_hold.firstName);
        setLastname(temp_data_hold.lastName);
        setAddress(temp_data_hold.address);
        setAge(String(temp_data_hold.age));
        setPhonenumber(temp_data_hold.phoneNumber);
        setDepartment(temp_data_hold.department);
        setDoctor(temp_data_hold.doctor);
        setRadioValue(temp_data_hold.gender);
        setDOB(temp_data_hold.date_of_birth);
        setCondition(temp_data_hold.condition)
        setTests(temp_data_hold.tests);
        })
        .catch((getAllError) => {
        console.log(getAllError);     
        })
    }

    const editPatientData = async()=>{
        //replace with proper api ip
        await fetch(FETCHAPILINK+patientid , {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patientId: patientid, //change later to be auto-number
                firstName: firstname,
                lastName: lastname,
                age: Number(age),
                gender:gender,
                address: address,
                date_of_birth: DOB,
                department: department,
                condition:  condition, //temp placement here as to allow for condition handling or "Normal"
                doctor:  doctor,
                tests: tests
            }),
        }).then((response) => response.json()).then((returnedJSON) => {
            alert("Patient Editted");
            console.log("Patient Editted");
        }).catch((getAllError) => {
            console.log(getAllError);     
        })
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || DOB;
        setShowDatePicker(false);
        setDOB(currentDate);
    };

    useEffect(()=>{
        getPatientData();
        //console.log(patientData + " " + patientid)
        
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innercontainer}>
                <View style={styles.inputwrapper}>
                    {/* Title */}
                    <Text style={styles.title}>Edit Patient Information</Text>

                    {/*  Start fields */}
                    <Text style={styles.inputlabel}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        placeholder="Enter new Patient name"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        placeholder="Enter new Patient last name"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Address</Text>
                    <TextInput
                        style={styles.textArea}
                        value={address}   
                        onChangeText={(text) => setAddress(text)}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Enter new Patient address"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={(text) => setAge(text)}
                        placeholder="Enter new Patient age"
                    />
                </View>
            
                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>DOB</Text>
                    {/*<DateTimePicker
                        value={DOB}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={styles.datePicker}
                        textColor="#FF0000" // Customize text color
                        testID="dateTimePicker"
                    />*/}
                    <TextInput
                        style={styles.input}
                        value={DOB}
                        onChangeText={(text) => setDOB(text)}
                        placeholder="Enter new Patient Date of Birth"
                    />
                </View>
               
                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        value={phonenumber}
                        onChangeText={(text) => setPhonenumber(text)}
                        placeholder="Enter new patient Phone number"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Department</Text>
                    <TextInput
                        style={styles.input}
                        value={department}
                        onChangeText={(text) => setDepartment(text)}
                        placeholder="Enter new Department type"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Condition</Text>
                    <TextInput
                        style={styles.input}
                        value={condition}
                        onChangeText={(text) => setCondition(text)}
                        placeholder="Enter new Patient Condition"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Doctor</Text>
                    <TextInput
                        style={styles.input}
                        value={doctor}
                        onChangeText={(text) => setDoctor(text)}
                        placeholder="Enter new Patient doctor name"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={[styles.inputlabel, styles.radiostyle]}>Gender</Text>
                    <RadioButtonGroup options={genders} 
                    onOptionSelect={setRadioValue}
                    selectedOption={gender}
                    />
                </View>

                <View style={styles.submitwrapper}>
                    <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => editPatientData()} >
                        <Text style={[styles.buttonText, styles.viewbtntxt]}>Edit Patient</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        minHeight: 500,
        backgroundColor: '#fff'
    },
    innercontainer: {
        padding: 15
    },
    inputwrapper: {
        marginTop: 8,
        marginBottom: 8
    },
    inputlabel: {
       color: '#858585',
       fontSize: 15,
       marginBottom: 5
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        padding: 15,
        backgroundColor: '#FDFDFD'
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
        color: '#6B81DC',
        fontWeight: 'bold'
    },
    textArea: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        padding: 10,
        height: 90,
        backgroundColor: '#FDFDFD'
    },
    submitwrapper: {
        marginTop: 15,
        marginBottom:50
    },
    viewbtn: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6B81DC',
        backgroundColor: '#6B81DC',
        paddingTop: 14,
        paddingBottom: 14
    },
    viewbtntxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
    radiostyle: {
        paddingBottom: 5
    }
});

export default EditPatient;
