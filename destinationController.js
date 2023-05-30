const db = require('nodeTask/database');

exports.createDestination = (req, res) => {
  const { account_id, url, http_method, headers } = req.body;

  const stmt = db.prepare('INSERT INTO destinations (account_id, url, http_method, headers) VALUES (?, ?, ?, ?)');
  stmt.run(account_id, url, http_method, JSON.stringify(headers), (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create a destination' });
    } else {
      res.status(201).json({ message: 'Destination created successfully' });
    }
  });

  stmt.finalize();
};

exports.updateDestination = (req, res) => {
    const { account_id, url, http_method, headers } = req.body;
  
    const stmt = db.prepare(`update destinations ( url, http_method, headers) VALUES (?, ?, ?, ?) where account_id = '${account_id}'`);
    stmt.run(account_id, url, http_method, JSON.stringify(headers), (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update a destination' });
      } else {
        res.status(201).json({ message: 'Destination update successfully' });
      }
    });
  
    stmt.finalize();
  };

exports.deleteDestination = (req, res) => {
const { account_id } = req.body;

const stmt = db.prepare(`delete from  destinations where account_id = '${account_id}'`);
stmt.run(account_id, url, http_method, JSON.stringify(headers), (err) => {
    if (err) {
    res.status(500).json({ error: 'Failed to delete a destination' });
    } else {
    res.status(201).json({ message: 'Destination deleted successfully' });
    }
});

stmt.finalize();
};

exports.getDestination = (req, res) => {
  const destinationId = req.params.id;

  db.get('SELECT * FROM destinations WHERE id = ?', [destinationId], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch the destination' });
    } else if (!row) {
      res.status(404).json({ error: 'Destination not found' });
    } else {
      res.status(200).json(row);
    }
  });
};
