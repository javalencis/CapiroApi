import mqtt from 'mqtt'
import Garland from '../models/garland.model.js'
import Alert from '../models/alert.model.js'
import Register from '../models/register.model.js'
import app from '../app.js'
import { generateAlert } from '../libs/functions.js'


const topicGuirnaldas = 'guirnaldas'
const topicAlertas = 'alertas'
const topicRegistros = 'registros'

// Configuración de la conexión MQTT
/* const options = {
    port: 8883,
    clientId: 'capiro-mqtt',
    username: 'capiroapi',
    password: 'capiroapi',

}; */
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'emqx_test',
    username: 'emqx',
    password: 'public',
  }
// Crear el cliente MQTT
const client = mqtt.connect('mqtt://broker.emqx.io:1883', options);

// Evento de conexión establecida
client.on('connect', () => {
    console.log('Conexión MQTT establecida');

    client.subscribe(topicGuirnaldas, (err) => {
        if (err) {
            console.error('Error al suscribirse al tema', err);
        }
    });

});

// Evento de mensaje recibido
client.on('message', async (topic, message) => {
    const messageReceive = JSON.parse(message.toString());
    if (topic === topicGuirnaldas) {

        let warning = false
        const garland = await Garland.findOne({
            bloque: messageReceive.bloque,
            guirnalda: messageReceive.guirnalda
        })

        console.log(messageReceive)
        if (messageReceive.estado === 'on') {
             if(generateAlert(messageReceive,garland)){
                warning=true
             }
        }
        await Garland.findOneAndUpdate(
            {
                bloque: messageReceive.bloque,
                guirnalda: messageReceive.guirnalda
            }, {
                bloque: messageReceive.bloque,
                guirnalda: messageReceive.guirnalda,
                estado: warning?"warning" : messageReceive.estado
                
            })
        app.emit('garland')
    } 
});

export default client;