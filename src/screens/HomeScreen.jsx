// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// export default function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Mini CRM</Text>

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Customers"
//           onPress={() => navigation.navigate("CustomerList")}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Leads"
//           onPress={() => navigation.navigate("LeadList")}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Dashboard"
//           onPress={() => navigation.navigate("Dashboard")}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Logout"
//           color="red"
//           onPress={() => navigation.replace("Login")}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 24, marginBottom: 30, textAlign: "center" },
//   buttonContainer: { marginBottom: 15 },
// });


import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import { ThemeContext } from "../screens/Context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mini CRM</Text>

      {/* Theme Toggle */}
      <View style={styles.toggleContainer}>
        <Text>{isDark ? "Dark Mode" : "Light Mode"}</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Customers" onPress={() => navigation.navigate("CustomerList")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Leads" onPress={() => navigation.navigate("LeadList")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Dashboard" onPress={() => navigation.navigate("Dashboard")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          color="red"
          onPress={() => navigation.replace("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 30, textAlign: "center" },
  buttonContainer: { marginBottom: 15 },
  toggleContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20, gap: 10 },
});
