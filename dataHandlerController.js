const db = require('nodeTask/database');
const axios = require('axios');

exports.handleIncomingData = (req, res) => {
  const appSecretToken = req.header('CL-X-TOKEN');
  const data = req.body;

  // Verify app secret token
  const stmt = db.prepare('SELECT * FROM accounts WHERE app_secret_token = ?');
  stmt.get(appSecretToken, (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Failed to verify app secret token' });
    } else if (!row) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      const accountId = row.id;

      // Get destinations for the account
      db.all('SELECT * FROM destinations WHERE account_id = ?', [accountId], (err, rows) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch destinations' });
        } else {
          rows.forEach((row) => {
            const { url, http_method, headers } = row;
            const requestOptions = {
              method: http_method,
              url: url,
              headers: JSON.parse(headers),
              data: http_method === 'get' ? { data } : data
            };

            axios(requestOptions)
              .then((response) => {
                console.log(`Successfully sent data to destination ${row.id}`);
              })
              .catch((error) => {
                console.error(`Failed to send data to destination ${row.id}: ${error.message}`);
              });
          });

          res.status(200).json({ message: 'Data sent to destinations' });
        }
      });
    }
  });
};
