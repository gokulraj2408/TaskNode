const db = require('nodeTask/database');

exports.createAccount = (req, res) => {
    const { email, account_id, account_name, website } = req.body;
    const app_secret_token = generateAppSecretToken();

    const stmt = db.prepare('INSERT INTO accounts (email, account_id, account_name, app_secret_token, website) VALUES (?, ?, ?, ?, ?)');
    stmt.run(email, account_id, account_name, app_secret_token, website, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create an account' });
        } else {
            res.status(201).json({ message: 'Account created successfully', app_secret_token });
        }
    });

    stmt.finalize();
};

exports.getAccount = (req, res) => {
    const accountId = req.params.id;

    db.get('SELECT * FROM accounts WHERE id = ?', [accountId], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch the account' });
        } else if (!row) {
            res.status(404).json({ error: 'Account not found' });
        } else {
            res.status(200).json(row);
        }
    });
};

exports.updateAccount = (req, res) => {
    const { email, account_id, account_name, website } = req.body;
    const app_secret_token = generateAppSecretToken();

    const stmt = db.prepare(`update accounts (account_id, account_name, app_secret_token, website) VALUES (?, ?, ?, ?, ?) where email='${email}' and id='${account_id}'`);
    stmt.run(email, account_id, account_name, app_secret_token, website, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create an account' });
        } else {
            res.status(201).json({ message: 'Account created successfully', app_secret_token });
        }
    });

    stmt.finalize();
};


exports.updateAccount = (req, res) => {
    const { email, account_id } = req.body;
    const app_secret_token = generateAppSecretToken();

    const stmt = db.prepare(`delete from accounts where email='${email}' and account_id='${account_id}'`);
    stmt.run(email, account_id, account_name, app_secret_token, website, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create an account' });
        } else {
            res.status(201).json({ message: 'Account created successfully', app_secret_token });
        }
    });

    stmt.finalize();
};