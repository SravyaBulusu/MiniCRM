// src/screens/LeadListScreen.jsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { API_URL } from "../../services/api";

export default function LeadListScreen({ route, navigation }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const customerId = route.params?.customerId;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/leads`;
      if (customerId) url += `?customerId=${customerId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.log("fetchLeads error:", err);
      Alert.alert("Error", "Unable to fetch leads. Check server and API_URL.");
    } finally {
      setLoading(false);
    }
  };

  // re-fetch whenever screen becomes focused
  useFocusEffect(
    useCallback(() => {
      fetchLeads();
    }, [customerId])
  );

  const handleDelete = (id) => {
    Alert.alert("Delete lead", "Are you sure you want to delete this lead?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(`${API_URL}/leads/${id}`, {
              method: "DELETE",
            });
            if (!res.ok) throw new Error(`Delete failed ${res.status}`);
            // optimistically update UI
            setLeads((prev) => prev.filter((l) => String(l.id) !== String(id)));
            Alert.alert("Success", "Lead deleted");
          } catch (err) {
            console.log("delete error:", err);
            Alert.alert("Error", "Unable to delete lead");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Lead"
        onPress={() => navigation.navigate("AddEditLead", { customerId })}
      />

      {loading ? (
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigation.navigate("AddEditLead", { lead: item })}
              >
                <Text style={styles.itemText}>
                  {item.title} — {item.status}
                </Text>
                {/* <Text style={styles.subText}>Customer ID: {item.customerId}</Text> */}
                <Text style={styles.subText}>
                  Customer IDs: {(item.customerIds || []).join(", ") || "None"}
                </Text>

              </TouchableOpacity>

              <View style={styles.buttons}>
                <Button
                  title="Edit"
                  onPress={() => navigation.navigate("AddEditLead", { lead: item })}
                />
                <View style={{ height: 6 }} />
                <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: { fontSize: 16, fontWeight: "600" },
  subText: { fontSize: 12, color: "#666" },
  buttons: { marginLeft: 10, justifyContent: "center" },
});
