/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { createRequire } from 'module'
import { seedRecordData } from './records.js'

const require = createRequire(import.meta.url)
const prisma = new PrismaClient()

const main = async () => {
    seedRecordData()

    const tables = ['User', 'Farm', 'Area', 'Crop', 'PlantedCrop', 'DeviceLog', 'Record', 'Schedule']
    for (const table of tables.slice().reverse()) {
        await prisma[table].deleteMany({})
    }

    for (const table of tables) {
        const data = require(`./data/${table}.json`)
        await prisma[table].createMany({ data })
    }

    await prisma.$executeRawUnsafe(`
        CREATE OR REPLACE FUNCTION notify_record_update()
        RETURNS TRIGGER AS $$
        BEGIN
        PERFORM pg_notify('record_changed', row_to_json(NEW)::text);
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `)

    await prisma.$executeRawUnsafe(`
        CREATE OR REPLACE TRIGGER record_update_trigger
        AFTER INSERT OR UPDATE OR DELETE ON "Record"
        FOR EACH ROW
        EXECUTE FUNCTION notify_record_update();
        `)

    console.log('Seed dữ liệu thành công!')
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
