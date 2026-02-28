# 🚨 Cross-Channel Mule Account Detection Graph

## 🏆 IntelliTrace Hackathon 2026  
Organized by Indian Bank in collaboration with VIT Chennai  
Theme: *Invent – Integrate – Impact*

---

## 📌 Problem Statement

Digital banking fraud is increasingly executed using **mule accounts** — accounts used to transfer illegally obtained funds across multiple channels such as:

- UPI  
- IMPS  
- NEFT  
- ATM withdrawals  
- Wallet transfers  

Traditional fraud detection systems operate in silos and rely heavily on rule-based checks.  
They often fail to detect **coordinated multi-account fraud networks operating across channels**.

There is a need for a **graph-based cross-channel fraud intelligence system** capable of identifying mule accounts using transaction network behavior.

---

## 💡 Proposed Solution

This project implements a **Graph-Based Mule Account Detection System** that:

- Models bank accounts as **nodes**
- Models transactions as **edges**
- Computes a **risk score**
- Detects high-centrality suspicious hubs
- Visually highlights fraud clusters

The system provides both analytical detection and interactive network visualization.

---

## 🧠 Core Detection Logic

Each account is assigned a **Risk Score** based on:

- Incoming transaction count  
- Number of unique connected accounts  

### Risk Score Formula

```
risk_score = (incoming_count × 2) + (unique_connections × 3)
```

If the risk score exceeds a defined threshold →  
🔴 The account is flagged as suspicious.

This helps detect:

- Transaction hubs  
- High-connectivity mule accounts  
- Coordinated fraud clusters  

---

## 📊 System Architecture

```
React Dashboard (Frontend)
        ↓
Node.js + Express API
        ↓
MySQL Database
        ↓
Fraud Detection Engine
        ↓
Graph Visualization (Network Intelligence)
```

---

## 🔗 Network Graph Intelligence

The graph view represents:

- 🟢 Green nodes → Safe accounts  
- 🔴 Red nodes → Suspicious accounts  
- 🔗 Edges → Transactions  
- Dense clusters → Potential mule networks  

Highly connected nodes indicate possible fraud hubs.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- react-force-graph-2d

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## 🚀 How to Run the Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/cross-channel-mule-detection.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:
```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## 🎯 Impact

- Enables early detection of mule networks  
- Reduces financial fraud losses  
- Supports cross-channel banking intelligence  
- Scalable for Public Sector Banks  

---

## 🔮 Future Enhancements

- Machine Learning anomaly detection  
- Community detection algorithms  
- Centrality metrics (Betweenness, PageRank)  
- Real-time streaming transaction monitoring  
- RBI fraud registry integration  

---

## 👨‍💻 Developed For

IntelliTrace Hackathon 2026  
Banking Intelligence & Fraud Detection Track

---

## 📜 Note

This project is a prototype developed for hackathon demonstration purposes.