const request = require("request");

const geocode = (place, callback) => {
  const mapurl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    place +
    ".json/?access_token=pk.eyJ1IjoiYmlsbHktYnV0Y2hlciIsImEiOiJjbDA3djE5YzgybGFjM2x0OHZwbHFxZHNsIn0.MYWCXVvlt09m5ZG35YiJVQ&limit=1";

  request({ url: mapurl, json: true }, (error, { body }) => {
    if (!error) {
      if (body.features.length !== 0) {
        callback(undefined, {
          lat: body.features[0].center[0],
          long: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      } else {
        callback("wrong Location ENtered");
      }
    } else {
      callback("cant connect to map services");
    }
  });
};

module.exports = geocode;
