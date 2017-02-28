
const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const argv = process.argv.slice(2);

knex('famous_people').insert([{first_name: argv[0], last_name: argv[1], birthdate: argv[2]}])
.then( function (result) {
}).finally(function() {
  knex.destroy();
});



