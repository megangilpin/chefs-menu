const connection = require("../dbConnection");
const chefSchema = require("../models/chef");

const Chef = connection.model("Chef", chefSchema);

module.exports = {
  findOneWithId: async (id) => {
    return await Chef
      .findOne({id})
  },
}