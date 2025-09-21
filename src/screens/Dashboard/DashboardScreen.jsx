// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function DashboardScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dashboard (Coming Soon)</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold" }
// });




import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { API_URL } from "../../services/api";

export default function DashboardScreen() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`);
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.log("Error fetching leads", err);
    }
  };

  // ✅ Group leads by status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // ✅ Calculate total value
  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);

  // ✅ Prepare Pie chart data
  const pieData = Object.keys(statusCounts).map((status, i) => ({
    name: status,
    count: statusCounts[status],
    color: ["#4caf50", "#2196f3", "#ff9800", "#f44336"][i % 4], // New, Contacted, Converted, Lost
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  // ✅ Prepare Bar chart data
  const barData = {
    labels: Object.keys(statusCounts),
    datasets: [{ data: Object.values(statusCounts) }],
  };

  // ✅ Group total value by status
  const valueByStatus = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + (lead.value || 0);
    return acc;
  }, {});

  // ✅ Prepare Value Bar chart data
  const valueBarData = {
    labels: Object.keys(valueByStatus),
    datasets: [{ data: Object.values(valueByStatus) }],
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Dashboard</Text>
      <Text style={styles.subHeader}>Leads by Status</Text>

      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text>No leads data available</Text>
      )}

      <Text style={styles.subHeader}>Leads Count by Status</Text>
      {barData.labels.length > 0 ? (
        <BarChart
          data={barData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero
          style={{ marginVertical: 10, borderRadius: 10 }}
        />
      ) : (
        <Text>No leads data available</Text>
      )}

      <Text style={styles.subHeader}>Lead Value by Status</Text>
      {valueBarData.labels.length > 0 ? (
        <BarChart
          data={valueBarData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero
          style={{ marginVertical: 10, borderRadius: 10 }}
        />
      ) : (
        <Text>No lead value data available</Text>
      )}


      <Text style={styles.totalValue}>💰 Total Value: ${totalValue}</Text>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#f5f5f5",
  backgroundGradientTo: "#f5f5f5",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subHeader: { fontSize: 18, marginVertical: 10 },
  totalValue: { fontSize: 18, marginTop: 20, textAlign: "center", fontWeight: "bold" },
});
