const db = require('./db');

async function create(price){
    const result = await db.query(
      `INSERT INTO prices (car_id, olxmin, olxmax, tucarro, calculated) 
      VALUES ("${price.car_id}", ${price.olxmin}, ${price.olxmax}, ${price.tucarro}, ${price.calculated})`
    );
  
    let message = 'Error in creating price';
  
    if (result.affectedRows) {
      message = 'Price created successfully';
    }
  
    return {message};
  }

  module.exports = {
    create,
}