const request = require("request");

const forecast = (x, y, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c01521019596bdf68c0c6975c71dd4bf&query=${x},${y}`;

  //applied destructuring
  request({ url, json: true }, (error, { body }) => {
    if (error) callback(`cant connect to weather services `);
    else {
      if (!body.error) {
        const data = {
          temperature: body.current.temperature,
          feelslike: body.current.feelslike,
          description: body.current.weather_descriptions,
          location: [
            body.location.name,
            body.location.country,
            body.location.region,
          ],
        };
        callback(undefined, data);
      } else {
        callback(`location not found`);
      }
    }
  });
};

module.exports = forecast;
