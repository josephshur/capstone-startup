'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Ratings', 'UserId', { type: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Ratings', 'UserId');
  }
};
