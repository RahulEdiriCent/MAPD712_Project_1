// PatientDetailed.js
import React, { useState } from 'react'; 
import { View, Text, Button, StyleSheet, ScrollView, TextInput, RadioForm, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddClinicalData = ({ navigation }) => {
    const [nursename, setNursename] = useState('');
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [respiratoryrule, setRespiratoryRule] = useState('');
    const [bloodoxygen, setBloodoxygen] = useState('');
    const [heartbeat, setHeartbeat] = useState('');
    
    // Date picker value
    const [DOB, setDOB] = useState(); //new Date()
    const [showDatePicker, setShowDatePicker] = useState(false);

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
                    <Text style={styles.inputlabel}>Nurse Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={nursename}
                        onChangeText={(text) => setNursename(text)}
                        placeholder="Nurse Name"
                    />
                </View>

                <View style={[styles.bloodinputwrapper, styles.inputwrapper]}>
                    <View style={styles.bloodinputs}>
                        <Text style={styles.inputlabel}>Systolic</Text>
                        <TextInput
                            style={styles.input}
                            value={systolic}
                            onChangeText={(text) => setSystolic(text)}
                            placeholder="Enter systolic"
                        />
                    </View>
                    <View style={styles.bloodinputs}>
                        <Text style={styles.inputlabel}>Diastolic</Text>
                        <TextInput
                            style={styles.input}
                            value={diastolic}
                            onChangeText={(text) => setDiastolic(text)}
                            placeholder="Enter diastolic"
                        />
                    </View>
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Respiratory rate</Text>
                    <TextInput
                        style={styles.input}
                        value={respiratoryrule}
                        onChangeText={(text) => setRespiratoryRule(text)}
                        placeholder="Enter respiratory rate"
                    />
                </View>
               
                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Blood oxygen Level</Text>
                    <TextInput
                        style={styles.input}
                        value={bloodoxygen}
                        onChangeText={(text) => setBloodoxygen(text)}
                        placeholder="Enter blood oxygen level"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>HeartBeat rate</Text>
                    <TextInput
                        style={styles.input}
                        value={heartbeat}
                        onChangeText={(text) => setHeartbeat(text)}
                        placeholder="Enter heartBeat rate"
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
                        placeholder="Enter Date of Birth"
                    />
                </View>

                <View style={styles.inputwrapper}>
                    <Text style={styles.inputlabel}>Radio Buttons</Text>
                </View>

                <View style={styles.submitwrapper}>
                    <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => navigation.navigate('ViewClinicalData')} >
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
