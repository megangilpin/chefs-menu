const axios = require("axios");

const KEY = process.env.GOOGLE_MAPS_API_KEY;
const urlHead = "https://maps.googleapis.com/maps/api"

const getAutoCompletePredictions = async (input) => {
    const url =
        "/place/autocomplete/json" +
        `?input=${input}&type=address&location=43.653225,-79.383186&radius=5000000&key=${KEY}`;

    const { data } = await axios.get(url);
    return data.predictions.map(({ description }) => description);
};

const getStaticMapImage = async (center) => {
    const url =
        "https://maps.googleapis.com/maps/api/staticmap" +
        `?center=${center}&scale=2&zoom=13&size=600x300&maptype=roadmap&key=${KEY}`;

    return await axios({ method: "get", url, responseType: "stream" });
};

const getLocationCoordinates = async (formattedAddress) => {
    console.log({formattedAddress})
    const url =
        "https://maps.googleapis.com/maps/api/geocode/json" +
        `?address=${encodeURIComponent(formattedAddress)}&key=${KEY}`;

    const { data: { status, results } } = await axios.get(url);

    if (status !== 'OK') {
        console.error(status)
        throw Error()
    }

    let lat, lng;
    if (
        results && Array.isArray(results) &&
        results[0] && typeof results[0] === "object"
    ) {
        const { formatted_address, geometry: { location } } = results[0];
        if (location && typeof location === "object") {
            lat = location.lat;
            lng = location.lng;
        }
        formattedAddress = formatted_address;
    }

    return { lat, lng, formattedAddress };
};

module.exports = {
    getAutoCompletePredictions,
    getStaticMapImage,
    getLocationCoordinates,
};
