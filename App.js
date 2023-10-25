import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AllPatientsScreen from './screens/AllPatients';
import PatientDetailes from './screens/PatientDetailed';
import ViewClinicalData from './screens/ViewClinicalData';
import AddPatient from './screens/AddPatient';
import EditPatient from './screens/EditPatient';
import AddClinicalData from './screens/AddClinicalData';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AllPatientsScreen" component={AllPatientsScreen} />
        <Stack.Screen name="PatientDetailes" component={PatientDetailes} />
        <Stack.Screen name="ViewClinicalData" component={ViewClinicalData} />
        <Stack.Screen name="AddPatient" component={AddPatient} />
        <Stack.Screen name="EditPatient" component={EditPatient} />
        <Stack.Screen name="AddClinicalData" component={AddClinicalData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

