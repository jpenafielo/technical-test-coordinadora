const { getConnection } = require('../database/mysql')
const userServices = require("../services/userServices")
const ExcelJS = require('exceljs');
const axios = require('axios');

const getAllEvents = async () => { 

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM events');
    return result

} 
const getEvent = async (eventId) => {

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
    return result
}
const createEvent = async (event) => { 

    const sql = `INSERT INTO events SET ?`;
    const connection = await getConnection();
    connection.query(sql, event)
    console.log("Evento creado exitosamente Evento:", event)

} 

const massiveCreationEvents = async (file) => {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0];

    worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
      if (rowNumber !== 1) {

        const dateToday = Date.now();
        const date_time = new Date(dateToday)
    
        const [emptydata, email, name, description, location, date] = row.values;
        const user = await userServices.getUserByEmail(email);
        
        const coordenates = await getCoordenates(location)

        const eventToRegister = {
            user_id: user[0].user_id,
            name,
            description,
            created_date: date_time,
            location: coordenates[0] + ',' + coordenates [1],
            assistance: 0,
            date
        }

        const connection = await getConnection();
        const sql = `INSERT INTO events SET ?`;
        connection.query(sql, [eventToRegister])

      }
    });

}

const updateEvent = async (eventId, event) => { 

    const sql = `UPDATE events SET ? WHERE event_id = ?`;
    const connection = await getConnection();
    connection.query(sql, [event, eventId])
    console.log("Evento actualizado exitosamente ID:", eventId)

} 
const deleteEvent =  async (eventId) => { 
    const sql = `DELETE FROM events WHERE event_id = ?`;
    const connection = await getConnection();
    connection.query(sql, eventId)
    console.log("Evento eliminado exitosamente, ID:", eventId)
}


const getCoordenates = async (address) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
    const params = {
        access_token: process.env.MAPBOX_ACCESS_TOKEN
    };

    try {
        const response = await axios.get(url, { params });
        const lugar = response.data.features[0];
        return lugar.center;
    } catch (error) {
        console.error(error);
    }

}

const getNearLocations = async (lon, lat, range) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json`;
    const params = {
        proximity: `${lon},${lat}`,
        types: 'poi',
        limit: 10,
        radius: range,
        access_token: process.env.MAPBOX_ACCESS_TOKEN
    };

    try {
        const response = await axios.get(url, { params });
        return response.data.features;
    } catch (error) {
        console.error(error);
    }
}


const getNearLocationsFromEvent = async (coordenates, range) => {

    try {

        let listCoordenates = coordenates.split(',');
        let lon = parseFloat(listCoordenates[0]);
        let lat = parseFloat(listCoordenates[1]);
        const response = await getNearLocations(lon, lat, range)
        return response;
    } catch (error) {
        console.error(error);
    }
}
module.exports = {

    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    massiveCreationEvents,
    getNearLocations,
    getNearLocationsFromEvent

}