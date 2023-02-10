const User = require('./User');
const Product = require('./Product');
const Bid = require('./Bid');

// Gallery.hasMany(Painting, {
//   foreignKey: 'gallery_id',
// });

// Painting.belongsTo(Gallery, {
//   foreignKey: 'gallery_id',
// });

module.exports = { User, Product, Bid };