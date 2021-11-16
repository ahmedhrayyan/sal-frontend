const timeFormats = [
	{ label: "year", seconds: 31536000 },
	{ label: "month", seconds: 2592000 },
	{ label: "day", seconds: 86400 },
	{ label: "hour", seconds: 3600 },
	{ label: "minute", seconds: 60 },
	{ label: "second", seconds: 1 },
];

export const timeSince = (time: string) => {
	const milliseconds = Date.parse(time);
	if (isNaN(milliseconds)) return null;
	const diff = (Date.now() - milliseconds) / 1000;

	for (const format of timeFormats) {
		const interval = diff / format.seconds;
		if (interval > 1) {
			const floorVal = Math.floor(interval);
			return `${floorVal} ${format.label + (floorVal > 1 ? "s" : "")}`;
		}
	}
};
