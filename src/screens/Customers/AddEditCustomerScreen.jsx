import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { API_URL } from "../../services/api";

export default function AddEditCustomerScreen({ route, navigation }) {
  const customer = route.params?.customer; // undefined if adding
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [company, setCompany] = useState(customer?.company || "");

  const handleSave = async () => {
    if (!name || !email || !phone || !company) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      if (customer) {
        // Editing existing customer
        await fetch(`${API_URL}/customers/${customer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: customer.id, name, email, phone, company }),
        });
        Alert.alert("Customer updated!");
      } else {
        // Adding new customer → auto-increment ID
        const res = await fetch(`${API_URL}/customers`);
        const allCustomers = await res.json();
        const maxId = allCustomers.length
          ? Math.max(...allCustomers.map((c) => Number(c.id)))
          : 0;

        const newCustomer = {
          id: maxId + 1,
          name,
          email,
          phone,
          company,
        };

        await fetch(`${API_URL}/customers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCustomer),
        });
        Alert.alert("Customer added!");
      }

      navigation.goBack(); // return to CustomerListScreen
    } catch (err) {
      console.log(err);
      Alert.alert("Error saving customer");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{customer ? "Edit Customer" : "Add Customer"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
