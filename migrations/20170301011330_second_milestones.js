
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones_two', function(table){
      table.increments();
      table.string('description');
      table.date('date_achieved');
      table.integer('famous_person_id');
      table.foreign('famous_person_id').references('famous_people.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones_two')
  ])
};