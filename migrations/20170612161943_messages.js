const moment= require('moment')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments();
    table.string('date_short');
    table.string('date_long');
    table.string('name');
    table.string('email');
    table.bigInteger('phoneNumber');
    table.string('topic');
    table.string('subject');
    table.text('message');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages')
}
