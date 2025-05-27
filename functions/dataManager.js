// functions/dataManager.js

const fs = require('fs');

// Fungsi untuk menyimpan data ke file
function saveData(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
}

// Fungsi untuk mengambil data dari file
function loadData(filename) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
}

// Ekspor fungsi
module.exports = {
    saveData,
    loadData
};
