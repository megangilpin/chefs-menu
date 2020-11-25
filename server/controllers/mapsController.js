const axios = require("axios");


const getAutoCompletePredictions = async (input) => {
    const url =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json" +
        `?input=${input}` +
        `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const { data } = await axios.get(url);
    return data.predictions.map(({ description }) => description);
};

const getStaticMapImage = async (center) => {
    const url =
        "https://maps.googleapis.com/maps/api/staticmap" +
        `?center=${center}` +
        "&scale=2&zoom=13&size=600x300&maptype=roadmap" +
        `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return await axios({ method: "get", url, responseType: "stream" });
};

module.exports = { getAutoCompletePredictions, getStaticMapImage };
