const axios = require("axios");

const { errorHandelingWrapper, coordinatesDistanceCalc, drawCirclePath } = require("../util");

console.log('drawCirclePath(lat, lng, 100)', drawCirclePath, errorHandelingWrapper) //(43.4698605, -80.5695588, 100))


const KEY = process.env.GOOGLE_MAPS_API_KEY;

const getAutoCompletePredictions = async (input) => {
    const url =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json" +
        `?input=${input}&type=address&location=43.653225,-79.383186&radius=5000000&key=${KEY}`;

    const { data } = await axios.get(url);
    return data.predictions.map(({ description }) => description);
};

const getStaticMapImage = async (center, lat, lng) => {
    let url =
        "https://maps.googleapis.com/maps/api/staticmap" +
        `?center=${center}&scale=2&zoom=13&size=600x300&maptype=roadmap`

    if (lat && lng) { //&& Number.isSafeInteger(lat) && Number.isSafeInteger(lng)) {
        url += `&fillcolor:0xff00002D|color:0xf96332ff|enc:${drawCirclePath(lat, lng, 100)}`
    }
    url += `&key=${KEY}`;

    console.log({center, lat, lng, url})
    return await axios({ method: "get", url, responseType: "stream" });
};

const getLocationCoordinates = async (formattedAddress) => {
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
