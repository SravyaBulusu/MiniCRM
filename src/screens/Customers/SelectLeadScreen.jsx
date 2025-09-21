import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { API_URL } from "../../services/api";

export default function SelectLeadScreen({ route, navigation }) {
  const { customer, onGoBack } = route.params;
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${API_URL}/leads`);
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.log("fetch leads error:", err);
        Alert.alert("Error", "Failed to load leads");
      }
    };
    fetchLeads();
  }, []);

  const assignLead = async (leadId) => {
    const updated = {
      ...customer,
      leads: [...new Set([...(customer.leads || []), leadId])],
    };

    try {
      await fetch(`${API_URL}/customers/${customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (onGoBack) onGoBack(); // refresh detail page
      navigation.goBack();
    } catch (err) {
      console.log("assign lead error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Lead to Assign</Text>
      <FlatList
        data={leads}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.leadItem}
            onPress={() => assignLead(item.id)}
          >
            <Text>{item.title} - {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12, fontWeight: "600" },
  leadItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
