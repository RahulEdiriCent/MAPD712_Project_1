// DetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const SeachPatientByName = ({ navigation }) => {
  const [patientData, setPatientData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const FETCHAPILINK = 'https://48c2-142-112-133-137.ngrok.io/patients';

  const getAllPatientData = async () => {
    await fetch(FETCHAPILINK, {
      method: 'GET',
    }).then((response) => response.json()).then((returnedJSON) => {
        const temp_data_hold = returnedJSON.map((item) => item);
        setPatientData(temp_data_hold);
      }).catch((getAllError) => {
        console.log(getAllError);
      });
  };

  const deleteOnePatientRecord = async (pid) => {
    await fetch(FETCHAPILINK + "/" + pid, {
      method: 'DELETE',
        }).then((response) => response.json()).then((returnedJSON) => {
        alert('!Patient with Id: ' + pid + ', has been Deleted!');
        console.log(returnedJSON);
        getAllPatientData();
      }).catch((DeleteOneError) => {
        console.log(DeleteOneError);
      });
  };

  const navCheck = (pid) => {
    navigation.navigate('PatientDetails', { patientid: pid });
  };

  useEffect(() => {
    getAllPatientData();
  }, []);

  const PatientDisplayCard = ({ patient }) => (
    <View style={styles.card}>
      <View style={[styles.carddetailwrapper, styles.flexcss]}>
        <View style={styles.imagewrapper}>
          <Image source={require('../assets/images/patient-1.png')} style={styles.patientimage} />
        </View>
        <View style={styles.detailwrapper}>
          <View style={styles.patientname}>
            <Text style={[styles.cardtext, styles.boldtext]}>Name: {patient.firstName + ' ' + patient.lastName} </Text>
          </View>
          <View style={styles.patientname}>
            <Text style={[styles.cardtext, styles.boldtext]}>Id: {patient.patientId}</Text>
          </View>
          <View style={styles.patientcondition}>
            <Text style={[styles.cardtext, styles.lighttext]}>
              Condition: <Text style={[styles.lighttext, styles.cardtext, styles.boldcardtext, styles.boldtext]}>{patient.condition}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.cardbtncontainer, styles.flexcss]}>
        <TouchableOpacity style={[styles.cardbtn, styles.viewbtn]} onPress={() => navCheck(patient.patientId)} id="delete">
          <Text style={[styles.buttonText, styles.viewbtntxt]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cardbtn, styles.removebtn]} onPress={() => deleteOnePatientRecord(patient.patientId)}>
          <Text style={[styles.buttonText, styles.removebtntxt]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.topbarcontainer, styles.flexcss]}>
        <View style={[styles.searchInputContainer, styles.innerbox]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.filterarea} onPress={() => whenFilterConditionChosen()}>
            <Text style={styles.filterTOText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.innercontainer}>
        <View style={styles.cardwrapper}>
          <FlatList
            data={patientData}
            renderItem={({ item }) => <PatientDisplayCard patient={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 500,
  },
  innercontainer: {
    padding: 15,
    marginBottom: 50,
    zIndex: -1,
  },
  title: {
    fontSize: 16,
    marginRight: 10,
  },
  boldtext: {
    fontWeight: '700',
  },
  cardtext: {
    fontSize: 14.5,
  },
  innerbox: {
    width: '75%',
  },
  flexcss: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientimage: {
    width: 62,
    height: 62,
  },
  detailwrapper: {
    paddingLeft: 12,
  },
  patientname: {
    marginBottom: 3,
  },
  lighttext: {
    color: '#858585',
  },
  cardbtncontainer: {
    marginTop: 5,
    justifyContent: 'flex-end',
  },
  cardbtn: {
    width: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B81DC',
  },
  buttonText: {
    textAlign: 'center',
    paddingTop: 6,
    paddingBottom: 6,
  },
  viewbtn: {
    marginRight: 14,
    backgroundColor: '#6B81DC',
  },
  viewbtntxt: {
    color: '#fff',
  },
  removebtntxt: {
    color: '#6B81DC',
  },
  topbarcontainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    zIndex: 1,
  },
  filterarea:{
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#6B81DC',
    backgroundColor: '#6B81DC',
  },
  filterTOText: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 12,
    paddingTop: 12,
    color: 'white',
  },
  deletebtncontainer: {
    width: '100%',
    marginLeft: '15%',
  },
  deletebutton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    width: '70%',
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
  },
  deleteicon: {
    paddingRight: 10,
  },
  dltbuttonText: {
    color: 'red',
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#FDFCFA',
    borderRadius: 8,
    padding: 13,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 12,
  },
  dropdownstyle: {
    zIndex: 8,
  },
  searchInputContainer: {
    width: '100%',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    height: 40,
  },
});

export default SeachPatientByName;
