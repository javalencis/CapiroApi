import mqtt from 'mqtt'
import Garland from '../models/garland.model.js'
import Control from '../models/control.model.js'
import Block from '../models/block.model.js'
import app from '../app.js'
import { generateAlert, generateAlertBlocks } from '../libs/functions.js'


const topicGuirnaldas = 'guirnaldas'
const topicControl = 'capiro/control/verificar'
const topicBloques = 'capiro/control/bloques'


// Configuración de la conexión MQTT
/* const options = {
    port: 8883,
    clientId: 'capiro-mqtt',
    username: 'capiroapi',
    password: 'capiroapi',

}; */
const options = {

    // Authentication
    clientId: 'emqx_test-1152215097',

}
// Crear el cliente MQTT
const client = mqtt.connect('mqtt://test.mosquitto.org:1883', options);
console.log('Conexión MQTT establecida')
// Evento de conexión establecida
client.on('connect', () => {

    client.subscribe(topicGuirnaldas, (err) => {
        if (err) {
            console.error('Error al suscribirse al tema', err);
        }
    });
    client.subscribe(topicControl, (err) => {
        if (err) {
            console.error('Error al suscribirse al tema', err);
        }
    });
    client.subscribe(topicBloques, (err) => {
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
            if (generateAlert(messageReceive, garland)) {
                warning = true
            }
        }
        await Garland.findOneAndUpdate(
            {
                bloque: messageReceive.bloque,
                guirnalda: messageReceive.guirnalda
            }, {
            bloque: messageReceive.bloque,
            guirnalda: messageReceive.guirnalda,
            estado: warning ? "warning" : messageReceive.estado

        })
        app.emit('garland')
    } else if (topic === topicControl) {


        const dataControl = await Control.findOne({bloque:messageReceive.bloque, reciente: true })
        const date = new Date();
        
        const controlEsp = {
            start_time: dataControl.hora_inicio,
            end_time: dataControl.hora_final,
            on_time: dataControl.tiempo_encendido,
            off_time: dataControl.tiempo_apagado,
            date: date.getTime()/1000
        }
    
        setTimeout(() => {
            client.publish("capiro/"+messageReceive.bloque+"/control", JSON.stringify(controlEsp), (error) => {
                if (error) {

                    console.log("No se pudo enviar el mensaje");
                    console.log(error)
                }
            })

        }, 2000)

    }else if(topic === topicBloques){
        if(messageReceive.estado_lectura != messageReceive.estado_salida){
            generateAlertBlocks(messageReceive)   
            await Block.findOneAndUpdate({bloque:messageReceive.bloque},{
                bloque:messageReceive.bloque,
                estado: "warning"
            })     
        }else{
            

            await Block.findOneAndUpdate({bloque:messageReceive.bloque},{
                bloque:messageReceive.bloque,
                estado: messageReceive.estado_lectura ? "on":"off"
            })  
        }
      
        console.log(messageReceive)
        app.emit('blocks')
    }
});

client.on('close', () => {
    console.log('Conexión MQTT cerrada inesperadamente');
});


export default client;