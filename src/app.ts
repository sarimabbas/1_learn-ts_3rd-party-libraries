// Code goes here!

import axios from "axios";

const formEl = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const API_KEY = "AIzaSyCYf7TBRkvgBPBuWM1l9xdDGBRKAw5619I";

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to Google API
  // const "https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters"

  const response = await axios.get<{
    results: { geometry: { location: { lat: number; lng: number } } }[];
  }>("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address: enteredAddress,
      key: API_KEY,
    },
  });

  const coordinates = response.data.results?.[0].geometry.location;

  new google.maps.Map(document.getElementById("map")!, {
    center: { lat: coordinates.lat, lng: coordinates.lng },
    zoom: 8,
  });

  console.log(response.data);
});
