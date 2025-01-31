$(() => {
  const API_TRANSPORT =
    "https://transport.integration.sl.se/v1/sites/9117/departures";

  const showTransport = async () => {
    try {
      let response = await fetch(API_TRANSPORT);
      let transport = await response.json();

      let metro = transport.departures[0].destination;
      console.log(metro);
    } catch (error) {
      console.log(error);
    }
  };
  showTransport();
});
