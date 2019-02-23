module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        name: DataTypes.STRING,
        allowNull: false
    });

    Customer.associate = function(models) {
        Author.hasMany(models.Burger, {
            onDelete: 'CASCADE'
        });
    };

    return Customer;
}
