// consts
const firstShipSelectorId = "firstShipSelector";
const secondShipSelectorId = "secondShipSelector";
const compareButtonId = "compare";
const compareTableId = "compareTable";
const nameRowId = "nameRow";
const costRowId = "costRow";
const speedRowId = "speedRow";
const cargoSizeRowId = "cargoSizeRow";
const passengersRowId = "passengersRow";

const shipsApiUrl = "https://swapi.co/api/starships/";

function* fetchShipData() {
    const ship1 = loadNode(firstShipSelectorId).value;
    const ship2 = loadNode(secondShipSelectorId).value;
    const ship1Response = yield fetch(shipsApiUrl + ship1);
    const ship2Response = yield fetch(shipsApiUrl + ship2);
    const ship1Data = yield ship1Response.json();
    const ship2Data = yield ship2Response.json();
    populateRow(nameRowId, ship1Data, ship2Data, "name");
    populateRow(costRowId, ship1Data, ship2Data, "cost_in_credits", true);
    populateRow(speedRowId, ship1Data, ship2Data, "MGLT", true);
    populateRow(cargoSizeRowId, ship1Data, ship2Data, "cargo_capacity", true);
    populateRow(passengersRowId, ship1Data, ship2Data, "passengers", true);
}

function populateRow(rowId, ship1Data, ship2Data, property, win) {
    const row = loadNode(rowId);

    const ship1PropertyValue = ship1Data[property];
    const ship2ProperyValue = ship2Data[property];

    row.cells[1].innerText = ship1PropertyValue;
    row.cells[2].innerText = ship2ProperyValue;
    row.cells[1].classList.remove("win");
    row.cells[2].classList.remove("win");

    if (win) {
        // edge cases "unknown"
        if (ship1PropertyValue === "unknown" || ship2ProperyValue === "unknown") {
            // do nothing
        } else if (ship1PropertyValue > ship2ProperyValue) {
            row.cells[1].classList.toggle("win");
        } else if (ship2ProperyValue > ship1PropertyValue) {
            row.cells[2].classList.toggle("win");
        }
    }
}

function loadNode(nodeId) {
    return document.getElementById(nodeId);
}

function run(genFunction) {
    const genObject = genFunction();

    function iterate(iteration) {
        if (iteration.done) {
            return Promise.resolve(iteration.value);
        }
        return Promise.resolve(iteration.value).then(
            x => iterate(genObject.next(x))
        ).catch(error => iterate(genObject.throw(error)));
    }

    try {
        return iterate(genObject.next());
    } catch(error) {
        return Promise.reject(error);
    }
}

loadNode(compareButtonId).addEventListener("click", function() {
    run(fetchShipData);
});