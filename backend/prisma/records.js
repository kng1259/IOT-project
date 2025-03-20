import fs, { write } from 'fs'

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

function generateData(amount) {
  let data = []
  const timestamp = new Date()
  for (var i = 0; i < amount; i++) {
    const recordTimestamp = new Date(timestamp.getTime() + i * 5000)
    data.push({
      timestamp: recordTimestamp,
      light: Math.random() * 25,
      temperature: Math.random() * 25,
      humidity: Math.random() * 25,
      soilMoisture: Math.random() * 25,
      areaId: 'area1234-5678-90ab-cdef-1234567890ab',
    })
  }
  return data
}

writeDataToJsonFile(generateData(100), 'prisma/data/Record.json')
