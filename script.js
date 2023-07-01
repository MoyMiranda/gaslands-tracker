$(document).ready(function () {
    generaEquipo();
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
    uncheck();
}

function generaEquipo(){
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
    for (const [key, arma] of Object.entries(weaponData)) {
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
    return actual;
}

function importJSON() {
    var json = null;
    json = $('#jsonLoadInput').val();
    json = JSON.parse(json);
    if ('name' in json && 'peso' in json && 'hull' in json && 'handling' in json && 'gearMax' in json && 'slots' in json && 'crew' in json && 'price' in json && 'weapons' in json && 'upgrades' in json) {
        $('#modalLoadCar').modal('toggle');
        generar(json);
    } else{
        alert('JSON no valido, falta algo -.-');
    }
    $('#jsonLoadInput').val('');
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function generar(veh = null) {
    if (veh === null) {
        veh = generaJSONveh();
    }
    var jsonString = escapeHtml(JSON.stringify(veh));
    var peso = '';
    switch (veh['peso']) {
        case 0:
            peso = 'Ligero';
        break;
        case 1:
            peso = 'Medio';
        break;
        case 2:
            peso = 'Pesado';
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
            <div class="card-title">`+veh['name']+`<button onclick="exportCar('` + jsonString + `')" type="button" class="btn btn-outline-primary"><img src="assets/media/export.png" class="img-card-btn"></button></div>
            <div class="basic-stats">
                <span><img src="assets/media/handling.png" alt="" srcset="" class="img-card-btn"> `+veh['handling']+`</span>
                <span><img src="assets/media/crew.png" alt="" srcset="" class="img-card-btn"> <span>`+veh['crew']+`</span></span>
                <span>
                    <button type="button" class="btn btn-outline-dark btn-sm" onclick="gearInd(`+totalTarjetas+`,0)"><img src="assets/media/shift-down.png" alt="" srcset="" class="img-card-btn"></button>
                    <button type="button" class="btn btn-outline-danger btn-sm" onclick="gearInd(`+totalTarjetas+`,1)"><img src="assets/media/shift-up.png" alt="" srcset="" class="img-card-btn"></button>
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
            <span class="peso"><img src="assets/media/peso.png" alt="" srcset="" class="img-card-btn">`+peso+`</span>
            <span>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="dmg(`+totalTarjetas+`,0)">
                    <img class="img-card-btn" src="assets/media/damage.png" alt="">
                </button>
                <button type="button" class="btn btn-outline-success btn-sm" onclick="dmg(`+totalTarjetas+`,1)">
                    <img class="img-card-btn" src="assets/media/fix.png" alt="">
                </button>
            </span>
            <span>
                <div class="input-group">
                    <button class="btn btn-outline-secondary" type="button" onclick="hazardCount(0,`+totalTarjetas+`)"><img class="img-card-btn" src="assets/media/hazard-less.png" alt=""></button>
                    <span class="input-group-text bg-transparent hazard-counter">0</span>
                    <button class="btn btn-outline-secondary" type="button" onclick="hazardCount(1,`+totalTarjetas+`)"><img class="img-card-btn" src="assets/media/hazard-plus.png" alt=""></button>
                </div>
            </span>
        </div>
    </div>`;
    $('#principal').append(tarjeta);
    totalTarjetas++;
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
        case 5:
            return 'Exp. Pequeña'
        break;
        case 6:
            return 'Exp. Grande'
        break;
    }
}

function roll(target,input) {
    var html = '';
    var qty = $('#'+input).val();

    for (let i = 0; i < qty; i++) {
        var resultado = Math.round(Math.random() * (6 - 1) + 1);
        if (target == 'skidBox'){
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
            html += `
                <div class="dice-box">
                    <span id="diceTest4"><img src="assets/media/`+img+`.png" class="dice-img" alt="" srcset=""></span>
                </div>
            `;
        }
        if (target == 'listaDados'){
            html += `<li>Dado #`+(i+1)+` = `+resultado+`</li>`;
        }
    }   
    $('#'+target).html(html);
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
    $(id +' .actualHull').html(newHull);
    toggle.toggleClass('hull-cool hull-dmg');
}

function exportCar(veh){

    navigator.clipboard.writeText(veh).then(function(x) {
        alert("Copiado al portapapeles: " + veh);
    });
}

function gearInd(id,modo) {
    //Modo 0 rapido, modo 1 lento
    id = '#tarjeta'+id;
    var actualGear = parseInt($(id+' .actual-gear').html());
    var maxGear = parseInt($(id+' .max-gear').html().slice(-1));
    switch (modo) {
        case 0:
            actualGear = actualGear <= 0  ? 0 :actualGear-1;
        break;
        case 1:
            actualGear = actualGear >= maxGear ? maxGear :actualGear+1;
        break;
    }
    $(id+' .actual-gear').html(actualGear);

}

function hazardCount(modo,id) {
    id = '#tarjeta'+id;
    var actualHazard = parseInt($(id+' .hazard-counter').html());
    switch (modo) {
        case 0:
            actualHazard = actualHazard <= 0  ? 0 :actualHazard-1;
        break;
        case 1:
            actualHazard = actualHazard >= 6 ? 6 :actualHazard+1;
        break;
    }
    $(id+' .hazard-counter').html(actualHazard);
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
    $('#globalGearActual').html(html);
}

function diceQty(modo, id) {
    var target = $('#'+id);
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
function uncheck() {
    $('#itemsList :checkbox:checked').prop( "checked", false );
}