const connection = require("../dbConnection");
const chefSchema = require("../models/chef");

const Chef = connection.model("Chef", chefSchema);

const findOneWithId = async (id) => {
    const data = await Chef.findById(id).populate("userId");
    return data;
};

const findAllChefs = async (query) => {
    const chefs = await Chef.find(query).populate("userId").exec();
    return chefs;
};

const findOneWithUserId = async (userId) => {
    const chef = await Chef.findOne({ userId });
    return chef;
};

const create = async ({ cuisineSpecialty, userId, stripeId }) => {
    const pojsoChef = {};
    pojsoChef.userId = userId;
    if (cuisineSpecialty) pojsoChef.cuisineSpecialty = cuisineSpecialty;
    if (stripeId) pojsoChef.stripeId = stripeId;
    const { _doc } = (await Chef.create(pojsoChef)) || {};
    return _doc;
};

const update = async (id, { cuisineSpecialty, userId }) => {
    const chef = await Chef.findById(id);
    if (cuisineSpecialty) chef.cuisineSpecialty = cuisineSpecialty;
    if (userId) chef.userId = userId;
    const { _doc } = await chef.save();
    return _doc;
};

const deleteAll = async () => Chef.deleteMany({});

module.exports = {
    create,
    update,
    findOneWithId,
    findAllChefs,
    findOneWithUserId,
    deleteAll,
};
