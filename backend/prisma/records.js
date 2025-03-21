import fs from 'fs';

/**
 * Write an array of objects to a JSON file.
 *
 * @param {Array} data - The array of objects to write to file
 * @param {string} outputPath - Path to the output JSON file
 */
function writeDataToJsonFile(data, outputPath) {
    try {
        // Convert the data to a formatted JSON string
        const jsonData = JSON.stringify(data, null, 2);

        // Write to file
        fs.writeFileSync(outputPath, jsonData);

        console.log(`Data successfully written to ${outputPath}`);
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
}

function getRandomInRange() {
    return 0.7 + Math.random() * 0.6;
}

function generateData(amount) {
    let data = [];
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
    };
    const timestamp = new Date(Date.now() + 3600000 * 7 - amount * 60000);
    for (var i = 1; i <= amount; i++) {
        const recordTimestamp = new Date(timestamp.getTime() + i * 60000);
        data.push({
            id: `rec${i}`,
            timestamp: recordTimestamp,
            light: getRandomInRange() * 500,
            temperature: getRandomInRange() * 25,
            humidity: getRandomInRange() * 60,
            soilMoisture: getRandomInRange() * 40,
            areaId: 'area1',
        });
        data.push({
            id: `rec${i}`,
            timestamp: recordTimestamp,
            light: getRandomInRange() * 500,
            temperature: getRandomInRange() * 25,
            humidity: getRandomInRange() * 60,
            soilMoisture: getRandomInRange() * 40,
            areaId: 'area2',
        });
    }
    return data;
}

export function seedRecordData() {
    writeDataToJsonFile(generateData(120), 'prisma/data/Record.json');
}
