$(document).ready(function () {
    $("input[name=peso]").change(function(){
        switch (true) {
            case $("#pesoLigero").is(':checked'):
                $( "#lightSelect" ).show();
                $("#midSelect").hide();
                $("#heavySelect").hide();
            break
            case $("#pesoMedio").is(':checked'):
                $("#midSelect").show();
                $( "#lightSelect" ).hide();
                $("#heavySelect").hide();
            break;
            case $("#pesoPesado").is(':checked'):
                $("#heavySelect").show();
                $("#midSelect").hide();
                $( "#lightSelect" ).hide();
            break;
            default:
            break;
        }
   });
});
var currentVehType = null;
var currentVehData = null;
var totalTarjetas = 0;



function procederEquipo(){
    generaEquipo();
    var vehClass = $("input[name=peso]:checked").val();
    var vehType = '';
    switch (vehClass) {
        case 'ligero':
            vehType = $('#lightCarSelect').val();
        break;
        case 'medio':
            vehType = $('#midCarSelect').val();
        break;
        case 'pesado':
            vehType = $('#heavyCarSelect').val();
        break;
    }

    currentVehType = vehType;
    var veh = carData[vehType];

    $('#vehType').html(vehClass + ' - ' + veh['name']);
    $('#slots').html(veh['slots']);
    $('#crew').html(veh['crew']);
    $('#price').html(veh['price']);
    $('#hull-info').html(veh['hull']);
    $('#handling-info').html(veh['handling']);
    $('#maxGearInfo').html(veh['gearMax']);
}

function generaEquipo(){
    // weaponData
    // upgradeData
    var html = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Ataque</th>
                    <th scope="col">Rango</th>
                    <th scope="col">Ranuras</th>
                    <th scope="col">Especiales</th>
                    <th scope="col">Costo</th>
                </tr>
            </thead>
            <tbody>
    `;
    // generar primero armas
    //console.log(weaponData);
    for (const [key, arma] of Object.entries(weaponData)) {
        // console.log(key);
        var rango = '';
        switch (arma.range) {
            case 0:
                rango = 'Colisión'
            break;
            case 1:
                rango = 'Corto'
            break;
            case 2:
                rango = 'Medio'
            break;
            case 3:
                rango = 'Largo'
            break;
            case 4:
                rango = 'Doble'
            break;
            case 5:
                rango = 'Exp. Pequeña'
            break;
            case 6:
                rango = 'Exp. Grande'
            break;
            case 7:
                rango = 'Esp'
            break;
        }
        var especiales = ``;
        if (arma.special.length >= 1) {
            arma.special.forEach(item => {
            especiales += `
                <span>🔥`+item+`</span>
            `;
            });
        } else {
            especiales = `N/A`;
        }
        html += `
            <tr>
                <th scope="row"><input class="form-check-input check-weapon" type="checkbox" id="" value="`+key+`"></th>
                <td>`+arma.name+`</td>
                <td>`+arma.type+`</td>
                <td>`+arma.atk+`</td>
                <td>`+rango+`</td>
                <td>`+arma.slots+`</td>
                <td class="special-info">`+especiales+`</td>
                <td>`+arma.price+`</td>
            </tr>
            `;
    }
    html += `
        </tbody>
    </table>`;
    //termina tabla de armas
    //Comienza tabla de Equipo/mejoras
    html += `
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Mejora</th>
                <th scope="col">Ranuras</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
            </tr>
        </thead>
        <tbody>
    `;
    for (const [key, mejora] of Object.entries(upgradeData)) {
        var descripcion = '';
        if (mejora.special.length >= 1) {
            mejora.special.forEach(item => {
            descripcion += `
                <span>🔥`+item+`</span>
            `;
            });
        } else {
            descripcion = `N/A`;
        }
        html += `
            <tr>
                <th scope="row"><input class="form-check-input check-upgrade" type="checkbox" id="" value="`+key+`"></th>
                <td>`+mejora.name+`</td>
                <td>`+mejora.slots+`</td>
                <td class="special-info">`+descripcion+`</td>
                <td>`+mejora.price+`</td>
            </tr>
        `;
    }
    $('#itemsList').html(html);
}

function generaJSONveh(){
    var actual = null
    actual = JSON.parse(JSON.stringify(carData[currentVehType]));

    var weaponsChecked = [];
    $('.check-weapon:checked').each(function() {
        weaponsChecked.push($(this).attr('value'));
    });

    var upgradesChecked = [];
    $('.check-upgrade:checked').each(function() {
        upgradesChecked.push($(this).attr('value'));
    });

    var weapons = []
    weaponsChecked.forEach(weaponCodename => {
        var weapon = weaponData[weaponCodename];
        item = weapon.name +'|'+ weapon.atk +'|'+ weapon.type +'|'+ rango(weapon.range);
        weapons.push(item)
    });
    actual.weapons = weapons;
    
    var upgrades = [];
    upgradesChecked.forEach(upgradeCodename => {
        var mejora = upgradeData[upgradeCodename];
        if (mejora.statMod.length >= 1){
            for (const [key, mod] of Object.entries(mejora.statMod)) {
                actual[mod.stat] = actual[mod.stat] + mod.amount;
            }
        }
        var item = mejora.name;
        upgrades.push(mejora.name);
    });
    actual.upgrades = upgrades;

    // currentVehData = actual;
    return actual;
}

function generar() {

    var veh = generaJSONveh();
    // console.log(veh);
    var peso = '';
    switch (veh['peso']) {
        case 0:
            peso = 'Peso Ligero';
        break;
        case 1:
            peso = 'Peso Medio';
        break;
        case 2:
            peso = 'Vehiculo Pesado';
        break;
    }

    var equipment = ``;
    if (veh.weapons.length > 0){
        veh.weapons.forEach(weapon => {
            equipment += `<span class="weapon">`+weapon+`</span>
            `;
        });
    }
    if (veh.upgrades.length > 0){
        veh.upgrades.forEach(upgrade => {
            equipment += `<span class="extra-item">`+upgrade+`</span>
            `;
        });
    }
    var hullPnts = '<div class="hull-point hull-cool"></div>'.repeat(veh['hull']);
    var tarjeta = `<div class="car-card" id="tarjeta`+totalTarjetas+`">
    <div class="stats">
        <div class="main-stats">
            <div class="card-title">`+veh['name']+`</div>
            <div class="basic-stats">
                <span>Handling: `+veh['handling']+`</span>
                <span>Tripulacion: <span>`+veh['crew']+`</span></span>
                <span>
                    <button type="button" class="btn btn-outline-danger btn-sm" onclick="gearInd(`+totalTarjetas+`,1)">fasto</button>
                    <button type="button" class="btn btn-outline-dark btn-sm" onclick="gearInd(`+totalTarjetas+`,0)">lento</button>
                </span>
            </div>
            <div class="hull">
                <span><span class="actualHull">`+veh['hull']+`</span><br>/<span class="totalHull">`+veh['hull']+`</span></span>
                <div class="hull-grid">
                `+hullPnts+`
                </div>
            </div>
        </div>
        <div class="gear">
                            <div class="card-title" style="text-align: center;">GEAR</div>
                            <div class="actual-gear">
                                0
                            </div>
            <div class="max-gear">MAX: `+veh['gearMax']+`</div>
        </div>
    </div>
    <div class="equipment">
        `+equipment+`
    </div>
        <div class="card-footer">
            <span class="peso">`+peso+`</span>
            <span>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="dmg(`+totalTarjetas+`,0)">Dañar</button>
                <button type="button" class="btn btn-outline-success btn-sm" onclick="dmg(`+totalTarjetas+`,1)">Reparar</button>
            </span>
            <span>
                <input type="number" name=""  class="hazardNumber" max="6" min="0">
                <img class="img-hazard" src="assets/hazard-dice.png" alt="">
            </span>
        </div>
    </div>`;
    $('#principal').append(tarjeta);
    totalTarjetas++;
    $('#modalNewCar').modal('hide');
}

function cerrar() {
    $('#modalNewCar').modal('hide');
}

function rango(number) {
    switch (number) {
        case 0:
            return 'Ariete'
        break;
        case 1:
            return 'Corto'
        break;
        case 2:
            return 'Medio'
        break;
        case 3:
            return 'Largo'
        break;
        case 4:
            return 'Doble'
        break;
    }
}

function roll() {
    var imgs = [];
    for (let i = 0; i < 4; i++) {

        var resultado = Math.round(Math.random() * (6 - 1) + 1);
        var img = null;
        switch (true) {
            case resultado == 1:        
                img = 'hazard-dice';
            break;
            case resultado == 2:        
                img = 'spin';
            break;
            case resultado == 3:        
                img = 'slide';
            break;
            case resultado > 3 && resultado < 7:        
                img = 'shift';
            break;
        }
        var html = `<img src="assets/`+img+`.png" class="dice-img" alt="" srcset="">`;
        imgs.push(html);
    }
    console.log(imgs);

    $('#diceTest').html(imgs[0]);
    $('#diceTest2').html(imgs[1]);
    $('#diceTest3').html(imgs[2]);
    $('#diceTest4').html(imgs[3]);
}

function mulDices() {
    var qty = $('#diceQty').val();
    var dados = [];
    var html = '';
    for (let i = 0; i < qty; i++) {
        var resultado = Math.round(Math.random() * (6 - 1) + 1);
        dados.push(resultado);
    }
    dados.forEach(function callback(value, index) {
        html += `<li>Dado #`+(index+1)+` = `+value+`</li>`
    });
    $('#listaDados').html(html);
}

function dmg(id,modo) {
    //Modo 0 dañar, modo 1 curar
    id = '#tarjeta'+id;
    var newHull = parseInt($(id +' .actualHull').html());
    var toggle = null;
    switch (modo) {
        case 0:
            toggle = $(id+' .hull-cool').first();
            newHull = newHull <= 0  ? 0 :newHull-1;
        break;
        case 1:
            toggle = $(id+' .hull-dmg').last();
            var maxHull = parseInt($(id +' .totalHull').html());
            newHull = newHull >= maxHull  ? maxHull :newHull+1;
        break;
    }
    console.log(newHull);
    $(id +' .actualHull').html(newHull);
    toggle.toggleClass('hull-cool hull-dmg');
}

function gearInd(id,modo) {
    //Modo 0 rapido, modo 1 lento
    id = '#tarjeta'+id;
    var actualGear = parseInt($(id+' .actual-gear').html());
    var maxGear = parseInt($(id+' .max-gear').html().slice(-1));
    console.log(maxGear);
    switch (modo) {
        case 0:
            actualGear = actualGear <= 0  ? 0 :actualGear-1;
        break;
        case 1:
            actualGear = actualGear >= maxGear ? maxGear :actualGear+1;
        break;
    }

    console.log(actualGear);
    $(id+' .actual-gear').html(actualGear);

}

function globalGear(modo) {
    //Modo 0:Restar, 1:Sumar
    var html = parseInt($('#globalGearActual').html());
    switch (modo) {
        case 0:
            html = html <= 0  ? 0 :html-1;
        break;
        case 1:
            html = html >= 6  ? 1 :html+1;
        break;
    }
    console.log(html);
    $('#globalGearActual').html(html);
}
function diceQty(modo) {
    var target = $('#diceQty');
    var dados = target.val();
    dados = parseInt(dados);
    switch (modo) {
        case 0:
            dados = dados <= 0  ? 0 :dados-1;
        break;
        case 1:
            dados = dados+1;
        break;
    }
    target.val(dados);
}