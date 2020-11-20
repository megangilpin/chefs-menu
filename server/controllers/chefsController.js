const connection = require("../dbConnection");
const chefSchema = require("../models/chef");

const Chef = connection.model("Chef", chefSchema);

const findOneWithId = async (id) => {
    const { _doc } = (await Chef.findById(id)) || {};
    return _doc;
};

const findAllChef = async (query) => {
    const chefs = await Chef.find(query);
    return chefs;
};

const findOneWithUserId = async (userId) => {
    const { _doc } = (await Chef.findOne({ userId })) || {};
    return _doc;
};

const create = async ({ cuisineSpecialty, userId }) => {
    const { _doc } = (await Chef.create({ cuisineSpecialty, userId })) || {};
    return _doc;
};

const update = async (id, { cuisineSpecialty, userId }) => {
    const chef = await Chef.findById(id);
    if (cuisineSpecialty) chef.cuisineSpecialty = cuisineSpecialty;
    if (userId) chef.userId;
    const { _doc } = await chef.save();
    return _doc;
};

const deleteAll = async () => Chef.deleteMany({});

module.exports = {
    create,
    update,
    findOneWithId,
    findAllChef,
    findOneWithUserId,
    deleteAll,
};
