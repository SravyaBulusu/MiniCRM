// import React from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// export default function RegisterScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>
//       <TextInput placeholder="Name" style={styles.input} />
//       <TextInput placeholder="Email" style={styles.input} />
//       <TextInput placeholder="Password" secureTextEntry style={styles.input} />
//       <Button title="Register" onPress={() => navigation.navigate("Login")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 }
// });



// src/screens/RegisterScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { API_URL } from "../../services/api"

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users?email=${email}`);
      const data = await res.json();

      if (data.length > 0) {
        Alert.alert("User already exists");
        return;
      }

      // Add new user
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      Alert.alert("Registration successful!");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
      Alert.alert("Error connecting to API");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
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
