import React, { useEffect, useState } from "react";
import axios from "axios";
import ForceGraph2D from "react-force-graph-2d";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [links, setLinks] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/detect-fraud")
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => {
        const formattedLinks = res.data.map((tx) => ({
          source: tx.from_account,
          target: tx.to_account
        }));
        setLinks(formattedLinks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const flagged = accounts.filter((acc) => acc.is_flagged);

  const graphData = {
    nodes: accounts.map((acc) => ({
      id: acc.id,
      name: acc.name,
      color: acc.is_flagged ? "red" : "green",
      risk: acc.risk_score
    })),
    links: links
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🚨 Cross-Channel Mule Account Detection</h1>

      <div style={{ marginBottom: "20px" }}>
        <h3>Total Accounts: {accounts.length}</h3>
        <h3>Flagged Accounts: {flagged.length}</h3>

        <button
          onClick={fetchData}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          🔄 Refresh Data
        </button>
      </div>

      <h2>🔗 Network Graph View</h2>
      <div
        style={{
          height: "400px",
          border: "1px solid gray",
          marginBottom: "30px"
        }}
      >
        {/* 🔥 IMPROVED GRAPH SETTINGS */}
<ForceGraph2D
  graphData={graphData}
  nodeLabel={(node) => `${node.name} | Risk: ${node.risk}`}
  linkDirectionalParticles={2}
  linkDirectionalParticleSpeed={0.003}
  d3VelocityDecay={0.3}
  d3AlphaDecay={0.02}
  nodeRelSize={6}
  cooldownTicks={100}
  nodeCanvasObject={(node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12 / globalScale;

    ctx.beginPath();
    ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();

    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillStyle = "black";
    ctx.fillText(label, node.x + 8, node.y + 3);
  }}
/>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Incoming</th>
            <th>Connections</th>
            <th>Risk Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr
              key={acc.id}
              style={{
                backgroundColor: acc.is_flagged ? "#ffcccc" : "white"
              }}
            >
              <td>{acc.name}</td>
              <td>{acc.incoming_count}</td>
              <td>{acc.unique_connections}</td>
              <td>
                <span
                  style={{
                    fontWeight: acc.is_flagged ? "bold" : "normal",
                    color: acc.is_flagged ? "red" : "black"
                  }}
                >
                  {acc.risk_score}
                </span>
              </td>
              <td>
                {acc.is_flagged ? "🔴 Suspicious" : "🟢 Safe"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;