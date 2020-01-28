const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringsAsArray');
const caculateDistance = require('./utils/caculateDistance');

const connection = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);
    
    io.on('connection', socket => {
        const {latitude, longitude, techs} = socket.handshake.query;

        connection.push({
            id:socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connection.filter(connection => {
        return caculateDistance(coordinates,connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to,message,data) =>{
    to.forEach(connection => {
        io.to(connection.id).emit(message,data);
    });
}