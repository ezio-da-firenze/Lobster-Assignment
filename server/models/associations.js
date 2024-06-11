const User = require("./User");
const Event = require("./Event");
const Registration = require("./Registration");

// Associations for the User, Event and Registration
User.hasMany(Registration, { foreignKey: "userId", onDelete: "CASCADE" });
Event.hasMany(Registration, { foreignKey: "eventId", onDelete: "CASCADE" });
Registration.belongsTo(User, { foreignKey: "userId" });
Registration.belongsTo(Event, { foreignKey: "eventId" });

module.exports = {
    User,
    Event,
    Registration,
};
