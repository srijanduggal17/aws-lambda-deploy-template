tev = require("./testevent.js");
test = require('../index.js');

(async () => {
	await test.handler(tev.event);
	console.log("Done");
	process.exit();
})();