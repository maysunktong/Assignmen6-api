$(() => {
  const API_SITES = "https://transport.integration.sl.se/v1/sites";

  const transportIcons = {
    bus: "./assets/bus.png",
    train: "./assets/pedel.png",
    metro: "./assets/metro.png",
    tram: "./assets/tram.png",
    ship: "./assets/ship.png",
  };


  function getLineColor(line) {
    if (!line) return "";
    if (line.toLowerCase().includes("röda")) return "red";
    if (line.toLowerCase().includes("gröna")) return "green";
    if (line.toLowerCase().includes("pendeltåg")) return "rgb(246, 38, 239)";
    if (line.toLowerCase().includes("spårväg")) return "rgb(181, 181, 181)";
    if (line.toLowerCase().includes("nockeby")) return "rgb(38, 96, 166)";
    if (line.toLowerCase().includes("lidingö")) return "rgb(153, 98, 49)";
    if (line.toLowerCase().includes("tvärbanan")) return "rgb(255, 149, 0)";
    if (line.toLowerCase().includes("saltsjö")) return "rgb(0, 195, 255)";
    if (line.toLowerCase().includes("roslags")) return "rgb(120, 63, 199)";
    return;
  }

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

      const allDepartures = data.departures;

      allDepartures.forEach((station) => {
        $("#result").append(`
          <div class="result-card">
            <div>
            <p class="result-station">${station["stop_area"]["name"]} → ${
          station.destination
        }</p>
            <p class="result-time">Departure: ${station.expected.slice(
              11,
              16
            )}</p>
            <div class="result-transport_container">
             <img class="result-transport-mode" src="${
               transportIcons[station.line["transport_mode"].toLowerCase()]
             }" alt="${station.line["transport_mode"]}" />
            <p class="result-transport-designation" style="background-color: ${getLineColor(station.line["group_of_lines"])};">
            ${station.line["designation"]}
        </p>
            </div>
          </div>
          <div>
            <p class="result-time-display" style="color: ${
              station.display.toLowerCase() === "nu" ? "red" : ""
            };">${station.display}</p>
          </div>
          </div>`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  $("#randomButton").on("click", getRandomStation);
});
