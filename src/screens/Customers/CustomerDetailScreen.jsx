import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { API_URL } from "../../services/api";

export default function CustomerDetailScreen({ route }) {
  const { customerId } = route.params;
  const [customer, setCustomer] = useState(null);
  const [allLeads, setAllLeads] = useState([]);
  const [showLeadPicker, setShowLeadPicker] = useState(false);

  const fetchData = async () => {
    try {
      const resCust = await fetch(`${API_URL}/customers/${customerId}`);
      const custData = await resCust.json();
      setCustomer(custData);

      const resLeads = await fetch(`${API_URL}/leads`);
      const leadsData = await resLeads.json();
      setAllLeads(leadsData);
    } catch (err) {
      console.log("fetch error:", err);
      Alert.alert("Error", "Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // link a lead to this customer
  // const addLeadToCustomer = async (leadId) => {
  //   const updated = {
  //     ...customer,
  //     leads: [...(customer.leads || []), leadId],
  //   };

  //   try {
  //     await fetch(`${API_URL}/customers/${customer.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updated),
  //     });
  //     setCustomer(updated);
  //     setShowLeadPicker(false);
  //   } catch (err) {
  //     console.log("addLead error:", err);
  //   }
  // };


  const addLeadToCustomer = async (leadId) => {
  const updatedCustomer = {
    ...customer,
    leads: [...(customer.leads || []), leadId],
  };

  try {
    // 1. Update customer
    await fetch(`${API_URL}/customers/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    });

    // 2. Fetch the lead
    const resLead = await fetch(`${API_URL}/leads/${leadId}`);
    const leadData = await resLead.json();

    // Ensure customerIds exists and add this customer
    const updatedLead = {
      ...leadData,
      customerIds: leadData.customerIds
        ? [...new Set([...leadData.customerIds, customer.id])]
        : [customer.id],
    };

    // Update lead
    await fetch(`${API_URL}/leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead),
    });

    setCustomer(updatedCustomer);
    setShowLeadPicker(false);
  } catch (err) {
    console.log("addLead error:", err);
    Alert.alert("Error", "Failed to add lead to customer");
  }
};


  // unlink a lead from this customer
  // const removeLeadFromCustomer = async (leadId) => {
  //   const updated = {
  //     ...customer,
  //     leads: (customer.leads || []).filter((id) => id !== leadId),
  //   };

  //   try {
  //     await fetch(`${API_URL}/customers/${customer.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updated),
  //     });
  //     setCustomer(updated);
  //   } catch (err) {
  //     console.log("removeLead error:", err);
  //   }
  // };

  const removeLeadFromCustomer = async (leadId) => {
  const updatedCustomer = {
    ...customer,
    leads: (customer.leads || []).filter((id) => id !== leadId),
  };

  try {
    // 1. Update customer
    await fetch(`${API_URL}/customers/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    });

    // 2. Fetch the lead
    const resLead = await fetch(`${API_URL}/leads/${leadId}`);
    const leadData = await resLead.json();

    // Remove customer id from lead
    const updatedLead = {
      ...leadData,
      customerIds: (leadData.customerIds || []).filter((cid) => cid !== customer.id),
    };

    // Update lead
    await fetch(`${API_URL}/leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead),
    });

    setCustomer(updatedCustomer);
  } catch (err) {
    console.log("removeLead error:", err);
    Alert.alert("Error", "Failed to unlink lead");
  }
};


  if (!customer) return <Text>Loading...</Text>;

  const customerLeads = allLeads.filter((l) =>
    (customer.leads || []).includes(l.id)
  );

  const availableLeads = allLeads.filter(
    (l) => !(customer.leads || []).includes(l.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{customer.name}</Text>
      <Text>Email: {customer.email}</Text>
      <Text>Phone: {customer.phone}</Text>
      <Text>Company: {customer.company}</Text>

      <Text style={styles.sectionTitle}>Customer's Leads</Text>
      <FlatList
        data={customerLeads}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.leadItem}>
            <Text>{item.title} - {item.status}</Text>
            <Button
              title="Unlink"
              color="red"
              onPress={() => removeLeadFromCustomer(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text>No leads linked yet</Text>}
      />

      <Button
        title={showLeadPicker ? "Cancel" : "Add Lead"}
        onPress={() => setShowLeadPicker(!showLeadPicker)}
      />

      {showLeadPicker && (
        <FlatList
          data={availableLeads}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.leadPickerItem}
              onPress={() => addLeadToCustomer(item.id)}
            >
              <Text>{item.title} - {item.status}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No more leads to add</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  sectionTitle: { marginTop: 20, fontSize: 18, fontWeight: "600" },
  leadItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  leadPickerItem: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    marginVertical: 4,
    borderRadius: 5,
  },
});
