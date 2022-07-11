const body = [
	{
		sku: "LBG",
		count: 3
	}
];

const event = {
	body: JSON.stringify(body)
};

exports.event = event;