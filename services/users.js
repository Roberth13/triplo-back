const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUsers(page){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, email, phone FROM users LIMIT ${offset},${config.listPerPage}`
  );
  //console.log("CANT: ",rows.length);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(user){
  const result = await db.query(
    `INSERT INTO users (names, email, phone) VALUES ("${user.name}", "${user.email}", "${user.phone}")`
  );
    console.log(result.insertId);
  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created successfully '+result.insertId;
  }

  return {message};
}

async function add(user){
  const result1 = await db.query(
    `INSERT INTO users (names, email, phone) VALUES ("${user.names}", "${user.email}", "${user.phone}")`
  );

  let message = 'Error in creating user';
  let idUser;
  if (result1.affectedRows) {
    const result = await db.query(
      `INSERT INTO quotes (model, make, year, version, version_id, user_id, km, status) 
      VALUES ("${user.model}", "${user.make}", "${user.year}", "${user.version}", ${user.version_id}, ${result1.insertId}, ${user.km}, "${user.status}")`
    );
    message = 'Error in creating quote';
    if (result.affectedRows) {
      message = 'User and quote created successfully';
      idUser = result.insertId
    }
  }
  return { mess: message, id: idUser };
}

async function getUser(id){
  const result = await db.query(
    `SELECT * FROM USERS WHERE id = ${id}`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM USERS WHERE id=${id}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}

async function update(id, user){
  const result = await db.query(
    `UPDATE USERS 
    SET name="${user.name}", email="${user.email}", phone="${user.phone}"  WHERE id=${id}` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return {message};
}

module.exports = {
    getUsers,
    create,
    getUser,
    remove,
    update,
    add
}