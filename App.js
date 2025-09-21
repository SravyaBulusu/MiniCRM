// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
// import { useColorScheme } from 'react-native';

// // Import your screens
// import LoginScreen from "./src/screens/Auth/LoginScreen";
// import RegisterScreen from "./src/screens/Auth/RegisterScreen";
// import HomeScreen from "./src/screens/HomeScreen"
// import CustomerListScreen from "./src/screens/Customers/CustomerListScreen";
// import CustomerDetailScreen from "./src/screens/Customers/CustomerDetailScreen";
// import SelectLeadScreen from "./src/screens/Customers/SelectLeadScreen";
// import AddEditCustomerScreen from "./src/screens/Customers/AddEditCustomerScreen"
// import LeadListScreen from "./src/screens/Leads/LeadListScreen";
// import AddEditLeadScreen from "./src/screens/Leads/AddEditLeadScreen";
// import DashboardScreen from "./src/screens/Dashboard/DashboardScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const scheme = useColorScheme(); // detects device theme
//   const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;
//   return (
//      <PaperProvider theme={theme}>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         {/* Auth Screens */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />

//         <Stack.Screen name="Home" component={HomeScreen} />

//         {/* Customer Screens */}
//         <Stack.Screen name="CustomerList" component={CustomerListScreen} />
//         <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
//         <Stack.Screen name="SelectLead" component={SelectLeadScreen} />

//         <Stack.Screen name="AddEditCustomer" component={AddEditCustomerScreen} />



//         {/* Lead Screens */}
//         <Stack.Screen name="LeadList" component={LeadListScreen} />
//         <Stack.Screen name="AddEditLead" component={AddEditLeadScreen} />


//         {/* Dashboard */}
//         <Stack.Screen name="Dashboard" component={DashboardScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </PaperProvider>
//   );
// }






import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import { ThemeProvider, ThemeContext } from "./src/screens/Context/ThemeContext";

// Import screens
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CustomerListScreen from "./src/screens/Customers/CustomerListScreen";
import CustomerDetailScreen from "./src/screens/Customers/CustomerDetailScreen";
import SelectLeadScreen from "./src/screens/Customers/SelectLeadScreen";
import AddEditCustomerScreen from "./src/screens/Customers/AddEditCustomerScreen";
import LeadListScreen from "./src/screens/Leads/LeadListScreen";
import AddEditLeadScreen from "./src/screens/Leads/AddEditLeadScreen";
import DashboardScreen from "./src/screens/Dashboard/DashboardScreen";

const Stack = createNativeStackNavigator();

// ✅ Separate AppNavigator to use context inside
function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CustomerList" component={CustomerListScreen} />
          <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
          <Stack.Screen name="SelectLead" component={SelectLeadScreen} />
          <Stack.Screen name="AddEditCustomer" component={AddEditCustomerScreen} />
          <Stack.Screen name="LeadList" component={LeadListScreen} />
          <Stack.Screen name="AddEditLead" component={AddEditLeadScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

