const User = require('./User');
const Product = require('./Product');
const Bid = require('./Bid');

User.hasMany(Product, {
    foreignKey: 'user_id',
});

Product.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Bid, {
    foreignKey: 'user_id',
});

Bid.belongsTo(User, {
    foreignKey: 'user_id',
});

Product.hasMany(Bid, {
    foreignKey: 'product_id',
});

Bid.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = {User, Product, Bid }
