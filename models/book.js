'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Profile, { 'foreignKey': 'profileId' })
    }
    static getBookbyLevel(filter) {
      return { [Op.iLike]: `%${filter}%` }
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Title cant be null' },
        notEmpty: { msg: 'Title cant be empty' },
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Level cant be null' },
        notEmpty: { msg: 'Level cant be empty' },
      }
    },
    code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description cant be null' },
        notEmpty: { msg: 'Description cant be empty' },
      }
    },
    publishYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg : 'PublishYear cant be null'},
        notEmpty: { msg : 'PublishYear cant be empty'},
      }
    },
    profileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  Book.beforeCreate((data) => {
    let date = data.publishYear
    if (data.level === 'Basic') {
      data.code = `B-${date}`
    }
    if (data.level === 'Intermediate') {
      data.code = `I-${date}`
    }
    if (data.level === 'Advance') {
      data.code = `A-${date}`
    }
  })
  return Book;
};