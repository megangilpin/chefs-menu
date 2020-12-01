const connection = require("../dbConnection");
const chefSchema = require("../models/chef");

const Chef = connection.model("Chef", chefSchema);

const findOneWithId = async (id) => {
    const { _doc } = (await Chef.findById(id)) || {};
    return _doc;
};

const findAllChefs = async (query) => {
    const chefs = await Chef.find(query).populate("userId").exec();
    return chefs;
};

const findOneWithUserId = async (userId) => {
    const { _doc } = await Chef.findOne({ userId });
    return _doc;
};

const create = async ({ cuisineSpecialty, userId }) => {
    console.log(cuisineSpecialty);
    console.log(userId);
    const pojsoChef = {};
    pojsoChef.userId = userId;
    if (cuisineSpecialty) pojsoChef.cuisineSpecialty = cuisineSpecialty;
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
