const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function create(findcar){
  const result1 = await db.query(
    `INSERT INTO users (names, email, phone) VALUES ("${findcar.names}", "${findcar.email}", "${findcar.phone}")`
  );

  let message = 'Error in creating user';
  let idUser;
  if (result1.affectedRows) {
    const result = await db.query(
      `INSERT INTO find_cars (model, make, year, version, user_id, km, status) 
      VALUES ("${findcar.model}", "${findcar.make}", "${findcar.year}", "${findcar.version}", ${result1.insertId}, ${findcar.km}, "${findcar.status}")`
    );
    message = 'Error in creating find_cars';
    if (result.affectedRows) {
      message = 'User and findCars created successfully';
      idUser = result.insertId
    }
  }
  return { mess: message, id: idUser };
}

module.exports = {
    create
}