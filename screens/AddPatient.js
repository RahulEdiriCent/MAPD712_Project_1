// PatientDetailed.js
import React, { useState } from 'react'; 
import { View, Text, Button, StyleSheet, ScrollView, TextInput, RadioForm, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup from '../components/RadioButtonGroup';



const AddPatient = ({ navigation }) => {
    const FETCHAPILINK = 'https://b9aa-99-211-193-59.ngrok.io/patients'; 

    const [patientId, setPateintId] = useState(0);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [department, setDepartment] = useState('');
    const [condition, setCondition] = useState('');
    const [doctor, setDoctor] = useState('');
    const [gender, setRadioValue] = useState('');
    const genders= ['Male', 'Female'];
    const conditions=['Normal','Critical'];
    // Date picker value

    const [DOB, setChosenDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || DOB;
        setShowDatePicker(false);
        setChosenDate(currentDate);
    };

    /*
    const addNewPatient = async()=>{//not functional with API 
        await fetch(FETCHAPILINK, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patientId: patientId, //change later to be auto-number
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender:gender,
                address: address,
                date_of_birth: DOB,
                department: department,
                condition:  condition, //temp placement here as to allow for condition handling
                doctor:  doctor
            }),
        }).then((response) => response.json()).then((json) => {
            //console.log(json);
            alert("Patient Added");
            console.log("Patient Added");
         })
        .catch((error) => {
          console.log(error);     
        });
    }*/

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innercontainer}>
                <View style={styles.inputwrapper}>
                    {/* Title */}
                    <Text style={styles.title}>Add New Patient</Text>

                    {/*  Start fields */}
                    <Text style={styles.inputlabel}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={(text) => setFirstname(text)}
                        placeholder="Enter your first name"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={(text) => setLastname(text)}
                        placeholder="Enter your last name"
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
                        placeholder="Enter your address"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={(text) => setAge(text)}
                        placeholder="Enter your age"
                    />
                </View>
            
                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>DOB</Text>
                    <DateTimePicker
                        value={DOB}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={styles.datePicker}
                        textColor="#FF0000" // Customize text color
                        testID="dateTimePicker"
                    />
                </View>
               
                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        value={phonenumber}
                        onChangeText={(text) => setPhonenumber(text)}
                        placeholder="Enter your phone number"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Department</Text>
                    <TextInput
                        style={styles.input}
                        value={department}
                        onChangeText={(text) => setDepartment(text)}
                        placeholder="Enter department type"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Doctor</Text>
                    <TextInput
                        style={styles.input}
                        value={doctor}
                        onChangeText={(text) => setDoctor(text)}
                        placeholder="Enter doctor name"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={[styles.inputlabel, styles.radiostyle]}>Gender</Text>
                    <RadioButtonGroup
                    options={genders} 
                    onOptionSelect={setRadioValue}
                    selectedOption={gender}
                    />
                </View>
                {/*  addNewPatient()*/}
                <View style={styles.submitwrapper}>
                    <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => navigation.navigate('ViewClinicalData')} > 
                        <Text style={[styles.buttonText, styles.viewbtntxt]}>Add Patient</Text>
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

export default AddPatient;
