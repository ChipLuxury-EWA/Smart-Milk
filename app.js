import HX711 from 'pi-hx711';

const loadCell = new HX711(6,5);
loadCell.offset = 50000;
loadCell.scale = 0.00001;

setInterval(async () => {
	const reading = await loadCell.read()
	if (reading < 81.5) {
			console.log(`No milk sending milk-req to space`)
		} else if ( reading > 83) {
			console.log(`New Milk Installed`)
		} else {
			console.log("reading:", reading.toFixed(2),"unScaled POC");
	}
}, 1000);
