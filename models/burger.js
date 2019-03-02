//Burger Model
module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        //Creates a string for the burger name which cannot be null and contains at least one character
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //Initializes the new burger as not yet devoured
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Burger;
}