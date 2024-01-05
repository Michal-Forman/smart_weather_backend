function test() {
  return "hello planet";
}

function getSunscreenNeed(uvIndex) {
  return 1 / (1 + 2 ** (-uvIndex + 3));
}

function getUmbrellaNeed(hourlyData) {
  let firstHourIndex;
  let highestRainIntensity = 0;

  // Get comparable time
  let today = new Date();
  today.setMinutes(0, 0, 0);
  today = today.toISOString();
  today = today.replace(/\.\d{3}/, "");

  // Find this hour in hourly data
  hourlyData.forEach((hour, index) => {
    if (hour.time === today) {
      firstHourIndex = index;
    }
  });
  for (let i = firstHourIndex; i < 7 + firstHourIndex; i++) {
    if (hourlyData[i].values.rainIntensity > highestRainIntensity) {
      highestRainIntensity = hourlyData[i].values.rainIntensity;
    }
  }

  // console.log("Highest rain intensity:", highestRainIntensity);
  return 1 / (1 + 2 ** (-highestRainIntensity + 2));
}

function getOutfit(temperature) {
  return 1 / (1 + 1.123 ** (-temperature + 8.833));
}

function getOutdoorActivities(hourlyData) {
  let today = new Date();
  today.setMinutes(0, 0, 0);
  today = today.toISOString();
  today = today.replace(/\.\d{3}/, "");

  // Find this hour in hourly data
  let firstHourIndex;
  hourlyData.forEach((hour, index) => {
    if (hour.time === today) {
      firstHourIndex = index;
    }
  });
  // get the average rain intensity for the next 16 hours
  let rainIntensitiesSum = 0;
  for (let i = firstHourIndex; i < 17 + firstHourIndex; i++) {
    /* console.log(
      "Hourly data rain intensity",
      hourlyData[i].time,
      hourlyData[i].values.rainIntensity,
    ); */
    rainIntensitiesSum += hourlyData[i].values.rainIntensity;
  }
  rainIntensity = rainIntensitiesSum / 16;

  // console.log(rainIntensity);
  return 1 / (1 + 100 ** (rainIntensity - 0.2));
}

module.exports = {
  test: test,
  getSunscreenNeed: getSunscreenNeed,
  getUmbrellaNeed: getUmbrellaNeed,
  getOutfit: getOutfit,
  getOutdoorActivities: getOutdoorActivities,
};
