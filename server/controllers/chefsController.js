const connection = require("../dbConnection");
const chefSchema = require("../models/chef");

const Chef = connection.model("Chef", chefSchema);

module.exports = {
  findOneWithId: async (id) => {
    await Chef
      .findOne({id})
      .catch(err => res.status(422).json(err));
  },
}