$(() => {
  const BASE_API = "https://transport.integration.sl.se/v1/sites";
  const getRandomStation = async () => {
    try {
      let hasDepartures = false;
      let data;

      while (!hasDepartures) {
        let randomId = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
        let response = await fetch(`${BASE_API}/${randomId}/departures`);
        if (!response.ok) {
          console.log(
            `Station ID ${randomId} not found or error fetching data.`
          );
          continue;
        }
        data = await response.json();

        /* Random station must have at least 1 departure */
        if (data.departures && data.departures.length > 0) {
          hasDepartures = true;
          console.log("Departures found for station ID:", randomId);
        }
      }
      $("#station-name").html(
        `${data.departures[0]["stop_area"]["name"]}`
      );
      const totalDepartures = data.departures.slice(0, data.departures.length);
      const showDepartures = totalDepartures.map((station) => {
        return station.destination;
      });
      $('#search-result').html(`${showDepartures}`)
    } catch (error) {
      console.log(error);
    }
  };
  $("#randomButton").on("click", getRandomStation);
});
