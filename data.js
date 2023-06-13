//Peso: 0=Ligero, 1=Mediano, 2=Pesado
const carData = {
    'moto' : {
        "name":"Motocicleta",
        "peso":0,
        "hull":4,
        "handling":5,
        "gearMax":6,
        "slots":1,
        "crew":1,
        "price":5
    },
    'bug' : {
        "name":"Buggy",
        "peso":0,
        "hull":6,
        "handling":4,
        "gearMax":6,
        "slots":2,
        "crew":2,
        "price":5
    },
    'trike' : {
        "name":"Triciclo",
        "peso":0,
        "hull":6,
        "handling":4,
        "gearMax":6,
        "slots":2,
        "crew":2,
        "price":5
    },
    'sidecar' : {
        "name":"Moto & Sidecar",
        "peso":0,
        "hull":6,
        "handling":4,
        "gearMax":6,
        "slots":2,
        "crew":2,
        "price":5
    },
    'car' : {
        "name":"Coche",
        "peso":1,
        "hull":10,
        "handling":3,
        "gearMax":5,
        "slots":2,
        "crew":1,
        "price":12
    },
    'jeep' : {
        "name":"Jeep",
        "peso":1,
        "hull":10,
        "handling":3,
        "gearMax":5,
        "slots":2,
        "crew":1,
        "price":12
    },
    'sport' : {
        "name":"Coche Deportivo",
        "peso":1,
        "hull":8,
        "handling":4,
        "gearMax":6,
        "slots":2,
        "crew":1,
        "price":15
    },
    'van' : {
        "name":"Furgoneta",
        "peso":1,
        "hull":12,
        "handling":2,
        "gearMax":4,
        "slots":3,
        "crew":3,
        "price":15
    },
    'pickup' : {
        "name":"Furgoneta",
        "peso":1,
        "hull":12,
        "handling":2,
        "gearMax":4,
        "slots":3,
        "crew":3,
        "price":15
    },
    'tractor' : {
        "name":"Tractor",
        "peso":1,
        "hull":12,
        "handling":2,
        "gearMax":4,
        "slots":3,
        "crew":3,
        "price":15
    },
    'giro' : {
        "name":"Girocoptero",
        "peso":1,
        "hull":4,
        "handling":4,
        "gearMax":6,
        "slots":9,
        "crew":1,
        "price":10
    },
    'monster' : {
        "name":"Monster Truck",
        "peso":2,
        "hull":10,
        "handling":3,
        "gearMax":4,
        "slots":2,
        "crew":2,
        "price":25
    },
    'bus' : {
        "name":"Autobus",
        "peso":2,
        "hull":16,
        "handling":2,
        "gearMax":3,
        "slots":3,
        "crew":8,
        "price":30
    },
    'tourBus' : {
        "name":"Autobus Turístico",
        "peso":2,
        "hull":16,
        "handling":2,
        "gearMax":3,
        "slots":3,
        "crew":8,
        "price":30
    },
    'warRig' : {
        "name":"Camión de Guerra",
        "peso":2,
        "hull":20,
        "handling":2,
        "gearMax":4,
        "slots":5,
        "crew":5,
        "price":40
    },
    'heli' : {
        "name":"Helicoptero",
        "peso":2,
        "hull":8,
        "handling":3,
        "gearMax":4,
        "slots":4,
        "crew":2,
        "price":30
    },
    'tank' : {
        "name":"Tanque",
        "peso":2,
        "hull":20,
        "handling":4,
        "gearMax":3,
        "slots":4,
        "crew":3,
        "price":40
    },
}
//Range: 0=Ariete 1=Plantilla pequeña, 2=Plantilla mediana, 3=Plantilla grande, 4=Doble, 5=Explosión Pequeña, 6=Explosión grande
//Regla Especial: "RS"
const weaponData = {
    'handgun' : {
        "name":"Arma de Mano",
        "type":"Disparo",
        "atk":"1D6",
        "range":2,
        "slots":0,
        "special":["Tripulacion"],
        "price":0
    },
    'sub' : {
        "name":"Ametralladora(Tripulación)",
        "type":"Disparo",
        "atk":"3D6",
        "range":2,
        "slots":0,
        "special":["Tripulacion", "Especialista"],
        "price":6
    },
    'sawed' : {
        "name":"Recortada",
        "type":"Disparo",
        "atk":"2D6",
        "range":5,
        "slots":0,
        "special":["Tripulacion", "Especialista"],
        "price":3
    },
    'rifle' : {
        "name":"Rifle",
        "type":"Disparo",
        "atk":"1D6",
        "range":4,
        "slots":0,
        "special":["Tripulacion", "Especialista"],
        "price":2
    },
    'net' : {
        "name":"Redes de Acero",
        "type":"Disparo",
        "atk":"1D6",
        "range":2,
        "slots":0,
        "special":["Tripulacion", "Especialista", "Atrapar"],
        "price":1
    },
    'frag' : {
        "name":"Granadas",
        "type":"Disparo",
        "atk":"1D6",
        "range":2,
        "slots":0,
        "special":["Tripulacion", "Municion 5", "Fuego", "Bombardeo", "Estallido"],
        "price":6
    },
    'gasFrag' : {
        "name":"Granadas de Gas",
        "type":"Disparo",
        "atk":"1D6",
        "range":2,
        "slots":0,
        "special":["Tripulacion", "Municion 5", "Gas", "Asfixiante"],
        "price":1
    },
    'molotov' : {
        "name":"Cocteles Molotov",
        "type":"Disparo",
        "atk":"1D6",
        "range":2,
        "slots":0,
        "special":["Tripulacion", "Municion 5", "Fuego", "Bombardeo"],
        "price":1
    },
    'mg' : {
        "name":"Ametralladora",
        "type":"Disparo",
        "atk":"2D6",
        "range":4,
        "slots":1,
        "special":[],
        "price":2
    },
    'hvyMg' : {
        "name":"Ametralladora Pesada",
        "type":"Disparo",
        "atk":"3D6",
        "range":4,
        "slots":1,
        "special":[],
        "price":4
    },
    'multiMg' : {
        "name":"Ametralladora Multicañón",
        "type":"Disparo",
        "atk":"4D6",
        "range":4,
        "slots":1,
        "special":[],
        "price":6
    },
    '125cannon' : {
        "name":"Cañón de 125mm",
        "type":"Disparo",
        "atk":"8D6",
        "range":4,
        "slots":3,
        "special":["Municion 3", "Fuego", "RS"],
        "price":6
    },
    'rocket' : {
        "name":"Cohetes",
        "type":"Disparo",
        "atk":"6D6",
        "range":4,
        "slots":2,
        "special":["Municion 3", "Estallido", "Altamente explosivo"],
        "price":6
    },
    'flame' : {
        "name":"Lanzallamas",
        "type":"Disparo",
        "atk":"6D6",
        "range":6,
        "slots":2,
        "special":["Municion 3", "Fuego", "Explosivo"],
        "price":6
    },
    'mortar' : {
        "name":"Mortero",
        "type":"Disparo",
        "atk":"4D6",
        "range":4,
        "slots":1,
        "special":["Municion 3", "RS"],
        "price":4
    },
    'oil' : {
        "name":"Aceite",
        "type":"Derrame",
        "atk":"-",
        "range":6,
        "slots":0,
        "special":["Municion 3", "RS"],
        "price":2
    },
    'spikes' : {
        "name":"Abrojos",
        "type":"Derrame",
        "atk":"-",
        "range":5,
        "slots":1,
        "special":["Municion 3", "RS"],
        "price":1
    },
    'glue' : {
        "name":"Pegamento",
        "type":"Derrame",
        "atk":"-",
        "range":6,
        "slots":1,
        "special":["Municion 1", "RS"],
        "price":1
    },
    'mine' : {
        "name":"Minas",
        "type":"Derrame",
        "atk":"3D6",
        "range":5,
        "slots":1,
        "special":["Municion 1", "Estallido", "RS"],
        "price":1
    },
    'humo' : {
        "name":"Humo",
        "type":"Derrame",
        "atk":"-",
        "range":6,
        "slots":0,
        "special":["Municion 3", "RS"],
        "price":1
    },
    'ram' : {
        "name":"Ariete",
        "type":"Choque",
        "atk":"+2D6",
        "range":0,
        "slots":1,
        "special":["RS"],
        "price":4
    },
    'ramBlast' : {
        "name":"Ariete Explosivo",
        "type":"Choque",
        "atk":"+6D6",
        "range":0,
        "slots":1,
        "special":["Municion 1", "Altamente Explosivo", "RS"],
        "price":3
    },
    'bfg' : {
        "name":"BIG FUKIN GUN",
        "type":"Disparo",
        "atk":"10D6",
        "range":4,
        "slots":2,
        "special":["Municion 1", "Potencia Ridicula"],
        "price":1
    },
    'laser' : {
        "name":"Laser de Combate",
        "type":"Disparo",
        "atk":"3D6",
        "range":4,
        "slots":1,
        "special":["Laser"],
        "price":5
    },
    'deathRay' : {
        "name":"Rayo de la Muerte",
        "type":"Disparo",
        "atk":"3D6",
        "range":4,
        "slots":1,
        "special":["Municion 1", "Atomizar"],
        "price":3
    },
    'arm' : {
        "name":"Brazo Mecanizado",
        "type":"Disparo",
        "atk":"3D6",
        "range":1,
        "slots":1,
        "special":["Lanzar"],
        "price":6
    },
    'arpon' : {
        "name":"Arpón",
        "type":"Disparo",
        "atk":"5D6",
        "range":4,
        "slots":1,
        "special":["Arpon"],
        "price":2
    },
    'seeker' : {
        "name":"Misiles Guiados",
        "type":"Disparo",
        "atk":"6D6",
        "range":7,
        "slots":2,
        "special":["Municion 3", "Estallido", "Guiado por Calor", "Altamente Explosivo"],
        "price":8
    },
    'bola' : {
        "name":"Bola de Demolición",
        "type":"Disparo",
        "atk":"Especial",
        "range":7,
        "slots":1,
        "special":["Bola de acero"],
        "price":4
    },
    'scraper' : {
        "name":"Lanza-Chatarra",
        "type":"Disparo",
        "atk":"Especial",
        "range":4,
        "slots":4,
        "special":["Municion 3", "Catapulta", "Carga Baja", "Descarga"],
        "price":4
    },
    'trabuco' : {
        "name":"Trabuco",
        "type":"Disparo",
        "atk":"*D6",
        "range":4,
        "slots":4,
        "special":["Metralla"],
        "price":2
    },
    'ricoBomb' : {
        "name":"Coche-Bomba R/C",
        "type":"Derrame",
        "atk":"Especial",
        "range":1,
        "slots":0,
        "special":["Municion 3", "Control Remoto"],
        "price":6
    },
    'guardian' : {
        "name":"Centinela Automático",
        "type":"Derrame",
        "atk":"2D6",
        "range":7,
        "slots":0,
        "special":["Municion 2", "Centinela"],
        "price":2
    },
    

}
const upgradeData = {
    'turret':{
        "name":"Montaje en Torreta",
        "slots":0,
        "special":["Arma gana alcance 360°"],
        "price":"3 Armas",
        "statMod":[]
    },
    'turbo':{
        "name":"Turbo Nitro",
        "slots":0,
        "special":["Municion 1", "RS"],
        "price":6,
        "statMod":[]
    },
    'plate':{
        "name":"Placas de Protección",
        "slots":1,
        "special":["+2 Vida"],
        "price":4,
        "statMod":[{"stat":"hull","amount":+2}]
    },
    'cat':{
        "name":"Orugas",
        "slots":1,
        "special":["-1 Max gear", "+1 Manejo", "RS"],
        "price":4,
        "statMod":[{"stat":"gearMax","amount":-1},{"stat":"handling","amount":+1}]
    },
    'addCrew':{
        "name":"Tripulante Extra",
        "slots":0,
        "special":["+1 Tripulante", "Maximo Doble de tripulación inicial"],
        "price":4,
        "statMod":[{"stat":"crew","amount":+1}]
    },
}
//ME FALTAN UN CHINGO; LOS HAGO MAÑANA XD