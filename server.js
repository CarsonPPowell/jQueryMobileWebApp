const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory


app.get('/data/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

app.post('/save-search', (req, res) => {
    const data = req.body;
    const csvContent = data.map(row => Object.values(row).join(",")).join("\n");
    const filePath = path.join(__dirname, 'search_results.csv');

    fs.writeFile(filePath, csvContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error saving search results');
        } else {
            res.send('Search results saved successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
