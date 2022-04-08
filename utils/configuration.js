exports.getSafeConfiguration = (configuration) => {
	for (const key in configuration) {
		if (Object.hasOwnProperty.call(configuration, key)) {
			const value = configuration[key];
			if (value.includes("omgv9")) {
				configuration[key] = "*****";
			}
			if (key.includes("PASSWORD")) {
				configuration[key] = "*****";
			}
			if (key.includes("ACCOUNT")) {
				configuration[key] = "*****";
			}
			if (key.includes("SECRET")) {
				configuration[key] = "*****";
			}
		}
	}
	return configuration;
};
