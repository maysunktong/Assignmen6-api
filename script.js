$(() => {
  const API_SITES = "https://transport.integration.sl.se/v1/sites";
  const API_DEVIATIONS =
    "https://deviations.integration.sl.se/v1/messages?future=true";

  const getRandomStation = async () => {
    try {
      let hasDepartures = false;
      let data;

      while (!hasDepartures) {
        let randomId = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
        let response = await fetch(`${API_SITES}/${randomId}/departures`);
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
      $("#station-name").html(`${data.departures[0]["stop_area"]["name"]}`);

      $("#result").empty();
      const totalDepartures = data.departures.slice(0, data.departures.length);

      totalDepartures.forEach((station) => {
        $("#result").append(`
          <div class="result-card">
            <div>
            <p class="result-station">${station.destination}</p>
            <p class="result-time">${station.expected.slice(11)}</p>
            <p class="result-transport-mode">${
              station.line["transport_mode"]
            }</p>
            <p class="result-transport-line">${
              station.line["group_of_lines"]
                ? station.line["group_of_lines"]
                : ""
            }</p>
          </div>
          <div>
            <p class="result-time-display">${station.display}</p>
          </div>
          </div>`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  $("#randomButton").on("click", getRandomStation);
});
