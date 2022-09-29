import HX711 from 'pi-hx711';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
//testing vs code from web app
dotenv.config()

const MONDAY_URL = process.env.MONDAY_URL;
const MONDAY_TOKEN = process.env.MONDAY_TOKEN;



const loadCell = new HX711(6,5);
loadCell.offset = 50000;
loadCell.scale = 0.00001;
const milkStateArray = ["Done", "Working on it"]

const updateMilkStatus = async (state) => {
	const ans = fetch(MONDAY_URL, {
		method: 'post',
		headers: {
			'Content-Type':'application/json',
			'Authorization': MONDAY_TOKEN
		},
		body: JSON.stringify({
			"query":`mutation{change_column_value(item_id:2782185108, board_id:2782106215, column_id:\"status\", value:\"{\\\"label\\\" : \\\"${state}\\\"}\"){name}}`
		})
	});
}

setInterval(async () => {
	const reading = await loadCell.read()
	if (reading < 81.5) {
			console.log(`No milk sending milk-req to Smart Milk board`)
			updateMilkStatus(milkStateArray[1])
		} else if ( reading > 83) {
			console.log(`New Milk Installed`)
			updateMilkStatus(milkStateArray[0])
		} else {
			console.log("reading:", reading.toFixed(2),"unScaled POC");
	}
}, 1000);
