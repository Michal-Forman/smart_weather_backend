function test() {
  return "hello planet";
}

function getSunscreenNeed(uvIndex) {
  return 1 / (1 + 2 ** (-uvIndex + 3));
}

function getUmbrellaNeed(hourlyData) {
  highestRainIntensity = 0;
  for (let i = 0; i < 7; i++) {
    if (hourlyData[i].values.rainIntensity > highestRainIntensity) {
      highestRainIntensity = hourlyData[i].values.rainIntensity;
    }
  }
  return 1 / (1 + 2 ** (-highestRainIntensity + 2));
}

function getOutfit(temperature) {
  return 1 / (1 + 1.2 ** (-temperature + 12));
}

function getOutdoorActivities(rainIntensity) {
  return 1 / (1 + 100 ** (rainIntensity - 0.2));
}

module.exports = {
  test: test,
  getSunscreenNeed: getSunscreenNeed,
  getUmbrellaNeed: getUmbrellaNeed,
  getOutfit: getOutfit,
  getOutdoorActivities: getOutdoorActivities,
};
