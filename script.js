$(() => {
  const API_DEPARTURES = "https://transport.integration.sl.se/v1/sites";
  const getRandomStation = async () => {
    try {
      let hasDepartures = false;
      let data;
      /* Random station must have at least 1 departure */
      while (!hasDepartures) {
        let randomId = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
        let response = await fetch(`${API_DEPARTURES}/${randomId}/departures`);
        if (!response.ok) {
          console.log(
            `Station ID ${randomId} not found or error fetching data.`
          );
          continue;
        }
        data = await response.json();

        if (data.departures && data.departures.length > 0) {
          hasDepartures = true;
          console.log("Departures found for station ID:", randomId);
        } else {
          console.log("No departures found for station ID:", randomId);
        }
      }
      $("#randomStationText").html(
        `${data.departures[0]["stop_area"]["name"]}`
      );
      const sliceArray = data.departures.slice(0, data.departures.length);
      console.log(sliceArray);
      const map = sliceArray.map((station) => {
        return station.destination;
      });
      console.log(map);
    } catch (error) {
      console.log(error);
    }
  };
  $("#randomButton").on("click", getRandomStation);
});
