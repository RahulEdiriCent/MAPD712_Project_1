// DetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AllPatientsScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [patientData, setPatientData] = useState();
  const FETCHAPILINK = 'https://6b0f-99-211-193-59.ngrok.io/patients'; 

  const items = [
    {label: 'Normal', value: 'Normal'},
    {label: 'Critical', value: 'Critical'},
    {label: 'No Filter', value: ''}
  ] 

  const getPatientsWithCondition = async(filterCondition)=>{
    console.log("Searchingr")
    await fetch((FETCHAPILINK + '/search/condition/' + filterCondition ), {
      method: 'GET'
    }).
    then((response) => response.json()).
    then((json) => {
     //console.log(json);
      const temp_data_hold = json.map(item => item);
      setPatientData(temp_data_hold);
     })
    .catch((error) => {
      console.log(error);     
    }) 
  }

  //delete all functionality integration with 713 API
  const whenFilterConditionChosen = async ()=>{
    //let currentValue1 = currentValue
    if (currentValue !== '' && currentValue !== null && currentValue !== undefined) {
      console.log("Condition Search: " + currentValue)
       getPatientsWithCondition(currentValue);
    }else if(currentValue === '' || currentValue == undefined ){
      console.log("---")
     getAllPatientData();
    }
  }

  //Fetch all patients functionality integration with 713 API--
  const getAllPatientData = async()=>{
    //replace with proper api ip
    await fetch(FETCHAPILINK , {
      method: 'GET'
    }).
    then((response) => response.json()).
    then((json) => {
     //console.log(json);
     const temp_data_hold = json.map(item => item);
      setPatientData(temp_data_hold);
     })
    .catch((error) => {
      console.log(error);     
    })
  }

  //delete all patients functionality integration with 713 API--
  const deleteAllPatientData = async ()=>{
    
    await fetch(FETCHAPILINK, {
      method: 'DELETE'
    }).
    then((response) => response.json()).
    then((json) => {
      alert("!All Patient Data Deleted!")
      console.log(json);
      setPatientData(); //update state to refresh page to show deleted data
     })
    .catch((error) => {
      console.log(error);     
    })
  }

  useEffect(()=>{
    getAllPatientData();
  }, []);

  const PatientDisplayCard = ({patient}) =>(
    <View style={styles.card}>
      <View style={[styles.carddetailwrapper, styles.flexcss]}>
           <View style={styles.imagewrapper}>
              <Image source={require('../assets/images/patient-1.png')} style={styles.patientimage} />
            </View>
            <View style={styles.detailwrapper}>
                <View style={styles.patientname}>
                  <Text style={[styles.cardtext, styles.boldtext]}>Name: {patient.firstName + " " + patient.lastName} </Text>
                </View>
                <View style={styles.patientname}>
                  <Text style={[styles.cardtext, styles.boldtext]}>Id: {patient.patientId}</Text>
                </View>
                <View style={styles.patientcondition}>
                  <Text style={[styles.cardtext, styles.lighttext]}>Condition: <Text style={[styles.lighttext, styles.cardtext, styles.boldcardtext, styles.boldtext]}>{patient.condition}</Text></Text>
                </View>
            </View>
          </View>
          <View style={[styles.cardbtncontainer, styles.flexcss]}>
            <TouchableOpacity style={[styles.cardbtn,styles.viewbtn]} onPress={() => navigation.navigate('PatientDetails')} id="delete">
              <Text style={[styles.buttonText, styles.viewbtntxt]}>View</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.cardbtn,styles.removebtn]}>
              <Text style={[styles.buttonText,styles.removebtntxt]}>Remove</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
    {/* dropdown and button container */}
    <View style={[styles.topbarcontainer,  styles.flexcss]}>
      <View style={[styles.leftdropdown, styles.innerbox]}>
        <DropDownPicker 
        style={styles.dropdownstyle}
        items={items}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={currentValue}
        setValue={(val)=>setCurrentValue(val)}  
        autoScroll
        placeholder='Select Condition'
        />
      </View>{/* setCurrentValue(val) */}
      <View  >
        <TouchableOpacity  onPress={whenFilterConditionChosen}>
          <Text >   Filter</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.deletebtncontainer, styles.innerbox]} >
        <TouchableOpacity style={styles.deletebutton} onPress={deleteAllPatientData}>
          <Image source={require('../assets/images/delete-icon.png')} style={styles.deleteicon} />
          <Text style={styles.dltbuttonText}>Delete All</Text>
        </TouchableOpacity>
      </View>
    </View>
    {/*<ScrollView>*/}
    <View style={styles.innercontainer}>
      {/* List section */}
      <View style={styles.cardwrapper} >      
        <FlatList
          data={patientData}
          renderItem={({item}) => < PatientDisplayCard patient={item}  />}
          keyExtractor={item => item._id}
        />  
      </View>
    </View>
    {/*</ScrollView>*/}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 500
  },
  innercontainer: {
    padding: 15,
    marginBottom: 50,
    zIndex: -1
  },
  title: {
    fontSize: 16,
    marginRight: 10,
  },
  boldtext: {
    fontWeight: '700'
  },
  cardtext: {
    fontSize: 14.5
  },
  innerbox: {
    width: '40%',
  },
  // Card css
  flexcss: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center'
  },
  patientimage: {
    width: 62,
    height: 62,
  },
  detailwrapper: {
    paddingLeft: 12
  },
  patientname: {
    marginBottom: 3
  },
  lighttext: {
    color: '#858585'
  },
  cardbtncontainer: {
    marginTop: 5,
    justifyContent: 'flex-end'
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
    paddingBottom: 6
  },
  viewbtn: {
    marginRight: 14,
    backgroundColor: '#6B81DC'
  },
  viewbtntxt: {
    color: '#fff'
  },
  removebtntxt: {
    color: '#6B81DC'
  },
  // Topbarcontainer
  topbarcontainer: {
    marginTop: 20,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    zIndex: 1
  },
  // Delete button css
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
    borderColor: '#323232',
    width: '70%',
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center'
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
  // Card css
  card: {
    backgroundColor: '#FDFCFA',
    borderRadius: 8,
    padding: 13,
    // Box shadow for Android
    elevation: 6,
    // Box shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 12
  },
  dropdownstyle: {
    zIndex: 8,
  }
});

export default AllPatientsScreen;
