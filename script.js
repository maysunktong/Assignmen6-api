$(() => {
  const API_DEPARTURES = "https://transport.integration.sl.se/v1/sites";
  const showTransport = async () => {
    try {
      let randomID = Math.floor(Math.random() * 9999);
      console.log("randomID", randomID);
      let departuresRes = await fetch(
        `${API_DEPARTURES}/${9117}/departures`
      );
      let departure = await departuresRes.json();
      console.log("Number of departures:", departure.departures.length);
      const sliceArray = departure.departures.slice(0,departure.departures.length)
      console.log(sliceArray)
      const map = sliceArray.map((station) =>{
        return station.destination
      })
      console.log(map)

    } catch (error) {
      console.log(error);
    }
  };

  showTransport();
});
