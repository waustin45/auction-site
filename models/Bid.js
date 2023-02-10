const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bid extends Model {}

Bid.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        bid_amt: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        }
    },
    {
        hooks: {
            //there should be a hook to check that a new bid is greater than all previous bids.
            //beforeCreate: (bid, )
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'bid',
    }
)

module.exports = Bid;