require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const functions = require("./functions.js");

const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

app.get("/:cords", function (req, res) {
  const cords = req.params.cords;
  // console.log(cords);
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
        data.timelines.daily[0].values.temperatureApparentAvg,
      );
      results.outfit = outfit;

      // Outdoor
      let outdoorActivities = functions.getOutdoorActivities(
        data.timelines.hourly,
      );
      results.outdoorActivities = outdoorActivities;

      res.send(results);
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
});

app.get("/testing/:cords", function (req, res) {
  const cords = req.params.cords;
  let results = {};
  results.umbrellaNeed = 0.8;
  results.sunscreenNeed = 0.4;
  results.outdoorActivities = 0.3;
  results.outfit = 0.9;
  results.cords = cords;
  res.send(results);
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
