import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

class Actions extends Model {}

Actions.init({
    shop_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Actions',
});

export default Actions;
