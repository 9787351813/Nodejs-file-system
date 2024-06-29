const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const folderPath = path.join(__dirname, 'files');

// Ensure the directory exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const currentDateTime = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${currentDateTime}.txt`;
    const filePath = path.join(folderPath, fileName);
    const timeStamp = new Date().toISOString();

    fs.writeFile(filePath, timeStamp, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error writing file', error: err });
        }
        res.status(200).json({ message: 'File created successfully', fileName: fileName });
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading directory', error: err });
        }
        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.status(200).json({ files: textFiles });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
