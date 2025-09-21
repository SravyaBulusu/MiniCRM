// import React from "react";
// import { View, Text, Button, FlatList, StyleSheet } from "react-native";

// export default function CustomerListScreen({ navigation }) {
//   const customers = [
//     { id: "1", name: "Alice", email: "alice@example.com" },
//     { id: "2", name: "Bob", email: "bob@example.com" }
//   ];

//   return (
//     <View style={styles.container}>
//       <Button title="Add Customer" onPress={() => navigation.navigate("AddEditCustomer")} />
//       <FlatList
//         data={customers}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Text
//             style={styles.item}
//             onPress={() => navigation.navigate("CustomerDetail", { customerId: item.id })}
//           >
//             {item.name} - {item.email}
//           </Text>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }
// });



import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { API_URL } from "../../services/api";

export default function CustomerListScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch customers from JSON Server
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/customers`);
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchCustomers);
    return unsubscribe; // re-fetch when screen comes into focus
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="Add Customer"
        onPress={() => navigation.navigate("AddEditCustomer")}
      />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() =>
                navigation.navigate("CustomerDetail", { customerId: item.id })
              }
            >
              {item.name} - {item.email}
            </Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
});
