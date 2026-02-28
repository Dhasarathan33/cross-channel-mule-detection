const db = require("../db");

exports.detectFraud = (req, res) => {
  const query = `
    SELECT 
      a.id,
      a.name,
      COUNT(t.to_account) AS incoming_count,
      COUNT(DISTINCT t.from_account) AS unique_connections
    FROM accounts a
    LEFT JOIN transactions t ON a.id = t.to_account
    GROUP BY a.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);

    const flaggedAccounts = results.map(account => {
      const risk_score =
        (account.incoming_count * 2) +
        (account.unique_connections * 3);

      return {
        ...account,
        risk_score,
        is_flagged: risk_score > 20
      };
    });

    res.json(flaggedAccounts);
  });
};