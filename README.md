# Mini CRM Mobile Application

A simple **CRM (Customer Relationship Management) Mobile App** built using **React Native** with API integration for managing Customers and Leads. Includes a Dashboard with charts and supports light/dark mode across the app.

---

## 📌 Features

- Add, Edit, Delete Customers
- Add, Edit, Delete Leads with:
  - Title
  - Status (New, Contacted, Converted, Lost)
  - Value
  - Customer Link
- Link/Unlink Leads to Customers
- Dashboard:
  - Pie chart for Leads by Status
  - Bar chart for Leads Count by Status
  - Bar chart for Total Values
- Light/Dark Mode toggle for the entire app
- Navigation between screens using React Navigation
- API integration (mock or real backend)

---

## 🛠 Tech Stack

- **Frontend:** React Native, React Native Paper, React Navigation
- **Charts:** `react-native-chart-kit`
- **State Management:** React Context API
- **Backend:** Mock API (JSON Server) or real API
- **Other Libraries:**  
  - `react-native-gesture-handler`  
  - `react-native-reanimated`  

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/SravyaBulusu/MiniCRM
   cd MiniCRM
2. **Install dependencies**
   - npm install
3. **Run Mock API**
   - npx json-server --watch db.json --port 5000
4. **Run the App**
   - npx expo start
5. **Environment Variables**
   - export const API_URL = "http://localhost:5000";

---

## 💡 Bonus Features

- Dashboard with multiple charts

- Mobile-friendly UI

- Lead value tracking

- Linking multiple leads to a customer




