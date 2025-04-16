/* eslint-disable no-console */
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

/**
 * Write an array of objects to a JSON file.
 *
 * @param {Array} data - The array of objects to write to file
 * @param {string} outputPath - Path to the output JSON file
 */
function writeDataToJsonFile(data, outputPath) {
    try {
        // Convert the data to a formatted JSON string
        const jsonData = JSON.stringify(data, null, 2)

        // Write to file
        fs.writeFileSync(outputPath, jsonData)

        console.log(`Data successfully written to ${outputPath}`)
    } catch (error) {
        console.error('Error writing to JSON file:', error)
    }
}

function getRandomInRange() {
    return 0.7 + Math.random() * 0.6
}

function generateData(amount) {
    let data = []
    const timestamp = new Date(Date.now() - amount * 60000 * 5)
    for (var i = 1; i <= amount; i++) {
        const recordTimestamp = new Date(timestamp.getTime() + i * 60000 * 5)
        data.push({
            id: uuidv4(),
            timestamp: recordTimestamp,
            light: getRandomInRange() * 45,
            temperature: getRandomInRange() * 27,
            humidity: getRandomInRange() * 40,
            soilMoisture: getRandomInRange() * 0,
            areaId: 1
        })
        data.push({
            id: uuidv4(),
            timestamp: recordTimestamp,
            light: getRandomInRange() * 65,
            temperature: getRandomInRange() * 24,
            humidity: getRandomInRange() * 50,
            soilMoisture: getRandomInRange() * 0,
            areaId: 2
        })
    }
    return data
}

export function seedRecordData() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    // Use join to create a path relative to the current file
    writeDataToJsonFile(generateData(60), join(__dirname, 'data/Record.json'))
    console.log('Record data seeded')
}
