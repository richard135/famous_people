const pg = require("pg");
const settings = require("./settings"); // settings.json
const argv = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function search(result){
  console.log('Found ' + result.rows.length + ' perons(s) by the name ' + argv + ':');
  for (let i = 0; i < result.rows.length; i++) {
    let date = result.rows[i].birthdate.toString().slice(0,15);
    console.log("- " + (i + 1) + ": " + result.rows[i].first_name + ' ' + result.rows[i].last_name + ', born ' + date); //output: 1
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", argv, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    search(result);
    client.end();
  });
});
