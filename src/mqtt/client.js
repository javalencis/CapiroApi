import mqtt from 'mqtt'
import Garland from '../models/garland.model.js'
import Alert from '../models/alert.model.js'
import Register from '../models/register.model.js'
import app from '../app.js'


const topicGuirnaldas = 'guirnaldas'
const topicAlertas = 'alertas'
const topicRegistros = 'registros'

// Configuración de la conexión MQTT
const options = {
    port: 8883,
    clientId: 'capiro-mqtt',
    username: 'capiroapi',
    password: 'capiroapi',

};

// Crear el cliente MQTT
const client = mqtt.connect('mqtts://j0e66e71.ala.us-east-1.emqxsl.com', options);

// Evento de conexión establecida
client.on('connect', () => {
    console.log('Conexión MQTT establecida');

    client.subscribe(topicGuirnaldas, (err) => {
        if (err) {
            console.error('Error al suscribirse al tema', err);
        }
    });

    client.subscribe(topicAlertas, (err) => {
        if (err) {
            console.error('Error al suscribirse al tema', err);
        }
    });

    client.subscribe(topicRegistros, (err) => {
        if (err) {
            console.error('Error al suscribirse al tema', err);
        }
    });
});

// Evento de mensaje recibido
client.on('message', async (topic, message) => {
    const messageReceive = JSON.parse(message.toString());
    if (topic === topicGuirnaldas) {
        const garland = await Garland.findOne( {
            bloque: messageReceive.bloque,
            guirnalda: messageReceive.guirnalda
        })

        


        await Garland.findOneAndUpdate(
            {
                bloque: messageReceive.bloque,
                guirnalda: messageReceive.guirnalda
            }, messageReceive)
            console.log(messageReceive)
        app.emit('garland')
    }else if(topic === topicAlertas){
        const newAlert = new Alert(messageReceive)
        await newAlert.save()
        app.emit('alert')

    }else if(topic === topicRegistros){
        const newRegister = new Register(messageReceive)
        await newRegister.save()
    }

});
