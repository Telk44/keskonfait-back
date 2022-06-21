// 'use strict';
// module.exports = {
//   up(queryInterface, Sequelize) {
//     return Promise.all([
//       queryInterface.addColumn(
//           'Users', // table name
//           'token', // new field name
//           {
//             type: Sequelize.STRING(255),
//           },
//       ),
//       queryInterface.addColumn(
//           'Users',
//           'active',
//           {
//             type: Sequelize.INT,
//             allowNull: false,
//             defaultValue: 0,
//           },
//       ),
//     ]);
//   },
//
//   down(queryInterface, Sequelize) {
//     // logic for reverting the changes
//     return Promise.all([
//       queryInterface.removeColumn('Users', 'token'),
//       queryInterface.removeColumn('Users', 'active'),
//     ]);
//   },
// };

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(  'Users',
          'active',
          {
            type: Sequelize.INT,
            allowNull: false,
            defaultValue: 0,
          },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'token');
  }
};