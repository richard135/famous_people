
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



function search(rows){
  console.log('Found ' + rows.length + ' perons(s) by the name ' + argv + ':');
  for (let i = 0; i < rows.length; i++) {
    let date = rows[i].birthdate.toString().slice(0,15);
    console.log("- " + (i + 1) + ": " + rows[i].first_name + ' ' + rows[i].last_name + ', born ' + date); //output: 1
  }
}

knex.select('*').from('famous_people')
.where('first_name', '=', argv[0] )
.orWhere('last_name', '=', argv[0])
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  search(rows);
}).then(function(){return knex.destroy}());



