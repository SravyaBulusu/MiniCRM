// import React from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// export default function LoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput placeholder="Email" style={styles.input} />
//       <TextInput placeholder="Password" secureTextEntry style={styles.input} />
//       <Button title="Login" onPress={() => navigation.navigate("CustomerList")} />
//       <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
//         Don’t have an account? Register
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 },
//   link: { color: "blue", textAlign: "center", marginTop: 10 }
// });



// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { API_URL } from "../../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        // Login success, navigate to Home
        Alert.alert("Login successful!");
        navigation.replace("Home");
      } else {
        Alert.alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error connecting to API");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { color: "blue", textAlign: "center", marginTop: 10 },
});
