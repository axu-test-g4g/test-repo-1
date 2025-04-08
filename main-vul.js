const child_process = require('child_process');
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(express.json());

// Command injection: user input may be executed as a shell command
app.get('/run', (req, res) => {
  const userCommand = req.query.cmd;
  child_process.exec(userCommand, (err, stdout) => {
    res.send(err ? err.message : stdout);
  });
});

// SQL injection: user input directly concatenated into the query
app.get('/user', (req, res) => {
  const db = new sqlite3.Database(':memory:');
  const name = req.query.name;
  const query = `SELECT * FROM users WHERE username = '${name}';`;
  db.all(query, [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Vulnerable app listening on port 3000!');
});
