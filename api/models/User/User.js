const Sequelize = require('sequelize');
const argon2 = require('argon2');

const sequelize = require('../../../config/database');
const Note = require('../Note/Note');

const hooks = {
  beforeCreate(user) {
    return argon2.hash('password').then(hash => {
      user.password = hash; // eslint-disable-line no-param-reassign
    });
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

User.hasMany(Note, { as: 'notes', foreignKey: 'userId' });

module.exports = User;
