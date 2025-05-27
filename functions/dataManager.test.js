// functions/dataManager.test.js
const { saveData, loadData } = require('./dataManager');

test('saves and loads data correctly', () => {
    const testData = { name: "Test", value: 42 };
    const filename = 'testData.json';
    
    saveData(filename, testData);
    const loadedData = loadData(filename);
    
    expect(loadedData).toEqual(testData);
});
