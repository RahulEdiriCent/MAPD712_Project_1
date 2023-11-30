// PatientDetailed.js
import React, { useState } from 'react'; 
import { View, Text, Button, StyleSheet, ScrollView, TextInput, RadioForm, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddClinicalData = ({ navigation, route }) => {
    const [nursename, setNursename] = useState('');
    const [testId, setTestId] = useState('');
    const [status, setStatus] = useState('');
    const [testDate, setTestDate] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [readingValues, setRValues] = useState('');
    const [readings, setReadings] = useState();
    
    // Date picker value
    const [DOB, setDOB] = useState(); //new Date()
    const [showDatePicker, setShowDatePicker] = useState(false);


    const {patientid} = route.params;
    const FETCHAPILINK = 'https://mapd713-api-group13.onrender.com/patients/';

    const addNewTest = async()=>{//not functional with API 

        if (isNaN(testId)) {
            alert("Test Id must be a Number: No Other Characters");
            return;
        }
    
        // Validate all fields are filled
        if (!testId || !status || !nursename || !type || !category || !readingValues) {
            alert("No Field can be Left Empty");
            return;
        }
    
        // Validate category
        if (!["Blood Test", "Respiratory Rate", "Blood Oxygen Level", "Heart Beat Rate"].includes(category)) {
            alert("Category must be Blood Test, Respiratory Rate, Blood Oxygen Level, Heart Beat Rate");
            return;
        }
    
        // Validate nurse name and type don't have numbers
        if (/\d/.test(nursename) || /\d/.test(type)) {
            alert("Nurse's Name and Test Type cannot contain numbers");
            return;
        }
    
        // Validate readings have at least one comma if below categories
        if (!readingValues.includes(',') && (["Blood Test", "Heart Beat Rate"].includes(category))) {
            alert("Readings must have at least One comma: Seperate readings");
            return;
        }

        if (readingValues.includes(',') && (["Respiratory Rate", "Blood Oxygen Level"].includes(category))) {
            alert("Only One reading, no commas for this category of Test");
            return;
        }
        var r = setReadingsData(readingValues)
         
        await new Promise((resolve) => setTimeout(resolve, 0));

        console.log(readings)
        
        await fetch(FETCHAPILINK + patientid + "/tests", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                testId: testId, //change later to be auto-number
                patientid: String(patientid),
                status: status,
                testDate: testDate,
                nurse_name: nursename,
                type:type,
                category: category,
                readings: r
            }),
        }).then((response) => response.json()).then((json) => {
            //console.log(json);
            alert("Test Added for Patient");
            console.log("Test Added");
         })
        .catch((error) => {
          console.log(error);     
        });
    }

    const setReadingsData = (readingsData) => {
        var theArray = [[]];
        var theValues = [];
        switch(category){
            case "Blood Test": //Pressure
            theValues = readingsData.split(',');
            theArray = [["dialstolic",theValues[0]], ["systolic", theValues[1]]]
            break;

            case "Respiratory Rate":
            theValues = readingsData;
            theArray = [["Rate (breaths/min)", theValues]];
            break;

            case "Blood Oxygen Level":
            theValues = readingsData;
            theArray = [["Blood Oxygen Percentage",theValues]]
            break;

            case "Heart Beat Rate":
            theValues = readingsData.split(',');
            theArray = [["Beat-Rate (beats/min)",theValues[0]], ["Heart-Beat Status", theValues[1]]]
            break;
            default: break;
        }
        console.log(theArray);
        //setReadings(theArray);
        return theArray;
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || DOB;
        setShowDatePicker(false);
        setDOB(currentDate);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innercontainer}>
                <View style={styles.inputwrapper}>
                    {/* Title */}
                    <Text style={styles.title}>Add New Clinical Test</Text>

                    {/*  Start fields */}
    

                    <Text style={styles.inputlabel}>TestId:</Text>
                    <TextInput
                        style={styles.input}
                        value={testId}
                        onChangeText={(text) => setTestId(text)}
                        placeholder="Test Id"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Test Date</Text>
                    <TextInput
                        style={styles.input}
                        value={testDate}
                        onChangeText={(text) => setStatus(text)}
                        placeholder="Enter Test Date"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Nurse Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={nursename}
                        onChangeText={(text) => setNursename(text)}
                        placeholder="Nurse Name"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Type:</Text>
                    <TextInput
                        style={styles.input}
                        value={type}
                        onChangeText={(text) => setType(text)}
                        placeholder="Enter Type"
                    />
                </View>


                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Test Category:</Text>
                    <TextInput
                        style={styles.input}
                        value={category}
                        onChangeText={(text) => setCategory(text)}
                        placeholder="Enter Test Category"
                    />
                </View>
            
                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Readings</Text>
                    <TextInput
                        style={styles.input}
                        value={readingValues}
                        onChangeText={(text) => setRValues(text)}
                        placeholder="Enter Readings: In order seperated by Comma"
                    />
                </View>

                <View style={styles.submitwrapper}>
                    <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => addNewTest()} >
                        <Text style={[styles.buttonText, styles.viewbtntxt]}>Add Test</Text>
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
    bloodinputwrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bloodinputs: {
        width: '46%'
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
});

export default AddClinicalData;
