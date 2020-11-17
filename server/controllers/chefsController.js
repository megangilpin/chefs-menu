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

const create = async ({ cuisineSpecialty, availability, userId }) => {
    const { _doc } =
        (await Chef.create({
            cuisineSpecialty,
            // availability,
            userId,
        })) || {};
    return _doc;
};

const update = async (id, { cuisineSpecialty, availability, userId }) => {
    const chef = await Chef.findById(id);
    // TODO: get the update array working
    if (cuisineSpecialty) chef.cuisineSpecialty;
    // if (availability) chef.availability;
    if (userId) chef.userId;
    // console.log({chef, cuisineSpecialty})
    const { _doc } = await chef.save();
    // console.log({_doc})
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
