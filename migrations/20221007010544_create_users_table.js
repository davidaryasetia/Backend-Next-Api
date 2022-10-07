/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Buat skema database login user
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("email");
    table.string("password");
    table.timestamp(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
