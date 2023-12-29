require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const functions = require("./functions.js");

// Enable CORS
app.use(cors());

app.get("/:cords", function (req, res) {
  const cords = req.params.cords;
  link = `https://api.tomorrow.io/v4/weather/forecast?location=${cords}&apikey=${process.env.TOMORROW_API_KEY}`;
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let results = {};
      // Process all data here
      // Umbrella
      let umbrellaNeed = functions.getUmbrellaNeed(data.timelines.hourly);
      results.umbrellaNeed = umbrellaNeed;

      // Sunscreen
      let sunscreenNeed = functions.getSunscreenNeed(
        data.timelines.daily[0].values.uvIndexMax,
      );
      results.sunscreenNeed = sunscreenNeed;

      // Outfit
      let outfit = functions.getOutfit(
        data.timelines.daily[0].values.temperatureAvg,
      );
      results.outfit = outfit;

      // Outdoor
      let outdoorActivities = functions.getOutdoorActivities(
        data.timelines.daily[0].values.rainIntensityAvg,
      );
      results.outdoorActivities = outdoorActivities;

      // Prepare and send results
      res.send(results);
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
