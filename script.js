$(() => {
  const API_TRANSPORT = "https://transport.integration.sl.se/v1";
  const API_DEVIATIONS = "https://deviations.integration.sl.se/v1";

  let transport = null;

  const fetchData = async (route) => {
    const response = await fetch(route);
    if (!response.ok)
      throw new Error(`‼️ Failed to fetch ${route}: ${response.status}`);
    return response.json();
  };

  // const displayTransport = async () => {
  //   try {
  //     transport = await fetchData(API_TRANSPORT);
  //     // displaying DOM
  //   } catch (error) {
  //     console.log("Error fetching transport:", error.message);
  //     // DOM: failed to load trains
  //   }
  // };

  // const displayDeviations = async () => {
  //   try {
  //     const deviations = await fetchData(API_DEVIATIONS);
  //   } catch (error) {
  //     console.log("Error fetching deviations:", error.message);
  //   }
  // };

  const displayDepartures = async () => {
    const stationInput = $("#stationInput").value.trim();
    const resultDiv = $("#result");
    resultDiv.html();

    if (!stationInput) {
      resultDiv.html(`<p class='error'>Please enter a station name.</p>`);
      return;
    }

    if (!transport) {
      resultDiv.html(
        "<p class='error'>Transport data not loaded. Please try again later.</p>"
      );
      return;
    }

    try {
      const departures = await fetchData(
        `${API_TRANSPORT}/sites/${siteId}/departures`
      );
    } catch (error) {
      console.log("Error fetching departures:", error.message);
    }
  };

  $("#searchButton").on("click", displayDepartures);

  displayTransport();
  displayDeviations();
  displayDepartures();
});
