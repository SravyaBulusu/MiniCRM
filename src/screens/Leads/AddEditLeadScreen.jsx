// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { API_URL } from "../../services/api";

// export default function AddEditLeadScreen({ route, navigation }) {
//   const lead = route.params?.lead; // if passed, editing; else adding
//   const customerId = route.params?.customerId; // link to a customer

//   const [title, setTitle] = useState(lead?.title || "");
//   const [status, setStatus] = useState(lead?.status || "");

//   const handleSave = async () => {
//     if (!title || !status) {
//       Alert.alert("Please fill all fields");
//       return;
//     }

//     try {
//       if (lead) {
//         // Editing existing lead
//         await fetch(`${API_URL}/leads/${lead.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ ...lead, title, status }),
//         });
//         Alert.alert("Lead updated!");
//       } else {
//         // Adding new lead → auto-increment ID
//         const res = await fetch(`${API_URL}/leads`);
//         const allLeads = await res.json();
//         const maxId = allLeads.length
//           ? Math.max(...allLeads.map((l) => Number(l.id)))
//           : 0;

//         const newLead = {
//           id: maxId + 1,
//           customerId, // link to customer
//           title,
//           status,
//         };

//         await fetch(`${API_URL}/leads`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newLead),
//         });
//         Alert.alert("Lead added!");
//       }

//       navigation.goBack();
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error saving lead");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{lead ? "Edit Lead" : "Add Lead"}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Status (e.g., New, In Progress, Closed)"
//         value={status}
//         onChangeText={setStatus}
//       />
//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
// });



import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { API_URL } from "../../services/api";

export default function AddEditLeadScreen({ route, navigation }) {
  const lead = route.params?.lead; // editing if passed
  const customerIds = route.params?.customerIds; // optional link

  const [title, setTitle] = useState(lead?.title || "");
  const [status, setStatus] = useState(lead?.status || "");
  const [value, setValue] = useState(lead?.value ? String(lead.value) : "");

  const handleSave = async () => {
    if (!title || !status || !value) {
      Alert.alert("Validation", "Please fill all fields including Value");
      return;
    }

    try {
      if (lead) {
        // EDIT existing lead
        await fetch(`${API_URL}/leads/${lead.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...lead,
            title,
            status,
            value: Number(value),
          }),
        });
        Alert.alert("Lead updated!");
      } else {
        // ADD new lead → auto-increment ID
        const res = await fetch(`${API_URL}/leads`);
        const allLeads = await res.json();
        const maxId = allLeads.length
          ? Math.max(...allLeads.map((l) => Number(l.id)))
          : 0;

        const newLead = {
          id: maxId + 1,
          customerIds: customerIds || null,
          title,
          status,
          value: Number(value),
          createdAt: new Date().toISOString(),
        };

        await fetch(`${API_URL}/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead),
        });
        Alert.alert("Lead added!");
      }

      navigation.goBack();
    } catch (err) {
      console.log("save lead error:", err);
      Alert.alert("Error saving lead");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lead ? "Edit Lead" : "Add Lead"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Status (New, Contacted, Converted, Lost)"
        value={status}
        onChangeText={setStatus}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
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
