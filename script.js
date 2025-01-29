$(() => {

  const API_TRANSPORT = "https://transport.integration.sl.se/v1";
  const API_DEVIATIONS = "https://deviations.integration.sl.se/v1";

  async function fetchTrainData() {
    try {
      const response = await fetch(`${endpoint}/rockets`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Train Data:", data);
    } catch (error) {
      console.error("Failed to fetch train data:", error);
    }
  }
  fetchTrainData();
});
