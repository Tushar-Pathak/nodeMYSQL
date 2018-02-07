module.exports = function () {

  const __mysql = require('mysql');
  const __sqlstring = require('sqlstring');
  let __credentials = {};

  function Connect(host, user, password, database) {
    "use strict";
    let Error = null;
    let return_Value = null;
    if (arguments.length != 0) {

      if (typeof host === "string" && typeof user === "string" && typeof password === "string") {
        if (arguments.length == 3) {
          __credentials["host"] = host;
          __credentials["user"] = user;
          __credentials["password"] = password;
        } else if (arguments.length == 4) {
          __credentials["host"] = host;
          __credentials["user"] = user;
          __credentials["password"] = password;
          return setDatabase(database);
        }
      } else {
        throw new Error("TypeError:host, user and password must be of string type.");
      }
    }

    return __credentials;
  }

  function __check_connection() {
    if (__credentials["user"] !== undefined && __credentials["host"] !== undefined && __credentials["password"] !== undefined) {
      return true;
    }
    return false;
  }

  /**
   * 
   * @param {*} database_name
   * function to setDatabase name according to user input given. 
   */
  function setDatabase(database_name) {

    return new Promise((resolve, reject) => {

      if (__check_connection()) {
        __credentials["database"] = database_name;
        __credentials["conn"] = new __sql_connect(function () {
          resolve("Successfully Connected!!");
        }).conn;
      } else {
        reject(new Error("connect() method must be called before this method"));
      }
    });
  }

  /**
   * Function to return current database name to the user.
   */
  function getDatabase() {
    return __credentials["database"];
  }

  /**
   * Function to return sql connection object to user.
   */
  function getConnectionObject() {
    return __credentials["conn"];
  }

  function __sql_connect(callback) {
    this.conn = __mysql.createConnection(__credentials);
    this.conn.connect((err) => {
      if (err)
        throw err;
      callback("done");
    });
  }

  /*
  @insert:Insert data into database.
  Function takes into two arguments,@table_name and @insert_value.
  */
  function Insert(table_name, insert_value) {
    if (__check_connection() == false) {
      throw new Error('You must call connect() function first.');
    }

    if (arguments.length == 2 && typeof insert_value === 'object' && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        let query = `INSERT INTO ${table_name} SET ?`;
        __credentials["conn"].query(query, insert_value, (err, value) => {
          if (err)
            throw err;
          console.log("done");
          resolve(value);
        });
      });
    } else if (arguments.length == 1 && typeof table_name === 'string') {
      console.log(table_name);
      return new Promise((resolve, reject) => {
        __credentials.conn.query(table_name, (err, value) => {
          if (err)
            reject(err);
          else
            resolve(value);
        });
      });
    } else {
      throw new Error("Sorry wrong no of arguments passed.......");
    }
  }

  /**
   * 
   * @param {*} table_name 
   * @param {*} condition 
   * @param {*} parameter 
   * function to select data from the database according to user input given.
   */
  function Select(table_name, condition, parameter) {
    let query = '';
    if (__check_connection() == false) {
      throw new Error('You must call connect() function first.');
    }
    if (arguments.length == 2 && Array.isArray(condition) && typeof table_name === 'string') {
      query = __sqlstring.format(` SELECT ?? FROM ${table_name} `, condition);
      console.log(query);
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    }
    else if (arguments.length === 2 && typeof table_name === 'string' && typeof condition === 'object') {
      query = `SELECT * FROM ${table_name} WHERE ?`;
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(query, condition, (err, result) => {
          if (err)
            throw err;
          console.log(result);
          resolve(result);
        });
      });
    } else if (arguments.length === 1 && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name === 'string' && (typeof condition === 'object' || typeof condition === 'string') && typeof parameter === 'object') {
      query = __sqlstring.format(`SELECT ?? FROM ${table_name} WHERE ?`, [condition, parameter]);
      console.log(query);
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else {
      throw new Error("Wrong no of arguments passed into function.");
    }
  }

  /**
   * 
   * @param {*} table_name 
   * @param {*} condition 
   * @param {*} parameter 
   * function to select data from the database according to user input given.
   * @param {*} limit value.
   */
  function SelectOne(table_name, condition, parameter) {
    let query = '';
    if (__check_connection() == false) {
      throw new Error('You must call connect() function first.');
    }
    if (arguments.length == 2 && Array.isArray(condition) && typeof table_name === 'string') {
      query = __sqlstring.format(` SELECT ?? FROM ${table_name} LIMIT 1`, condition);
      console.log(query);
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    }
    else if (arguments.length === 2 && typeof table_name === 'string' && typeof condition === 'object') {
      query = `SELECT * FROM ${table_name} WHERE ? LIMIT 1`;
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(query, condition, (err, result) => {
          if (err)
            throw err;
          console.log(result);
          resolve(result);
        });
      });
    } else if (arguments.length === 1 && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name === 'string' && (typeof condition === 'object' || typeof condition === 'string') && typeof parameter === 'object') {
      query = __sqlstring.format(`SELECT ?? FROM ${table_name} WHERE ? LIMIT 1`, [condition, parameter]);
      console.log(query);
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else {
      throw new Error("Wrong no of arguments passed into function.");
    }
  }

  function Update(table_name, condition, parameter) {
    if (__check_connection == false) {
      throw new Error('you must call connect() first.');
    }
    if (arguments.length == 2 && typeof table_name === 'string' && typeof condition === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(` Update ${table_name} SET ?`, [condition]);
        console.log(query + " query");
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else if (arguments.length == 1 && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name === 'string' && typeof condition === 'object' && typeof parameter === 'number') {
      return new Promise((resolve, reject) => {
        console.log(parameter);
        query = __sqlstring.format(`UPDATE ${table_name} SET ? LIMIT ${parameter}`, condition);
        console.log(query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name === 'string' && typeof condition === 'object' && typeof parameter === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`UPDATE ${table_name} SET ? WHERE ?`, [condition, parameter]);
        console.log("query " + query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else {
      throw new Error("Wrong no of arguments passed into function.");
    }
  }

  function UpdateOne(table_name, condition, parameter) {
    if (__check_connection == false) {
      throw new Error('you must call connect() first.');
    }
    if (arguments.length == 2 && typeof table_name === 'string' && typeof condition === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(` Update ${table_name} SET ? LIMIT 1`, [condition]);
        console.log(query + " query");
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else if (arguments.length == 1 && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name === 'string' && typeof condition === 'object' && typeof parameter === 'number') {
      return new Promise((resolve, reject) => {
        console.log(parameter);
        query = __sqlstring.format(`UPDATE ${table_name} SET ? LIMIT ${parameter}`, condition);
        console.log(query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name === 'string' && typeof condition === 'object' && typeof parameter === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`UPDATE ${table_name} SET ? WHERE ? LIMIT 1`, [condition, parameter]);
        console.log("query " + query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    } else {
      throw new Error("Wrong no of arguments passed into function.");
    }
  }

  function Delete(table_name, condition) {
    if (__check_connection() == false) {
      throw new Error("you must call connect() first.");
    }
    if (arguments.length == 1 && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        __credentials.query(table_name, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length == 2 && typeof table_name === 'string' && typeof condition === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`DELETE FROM ${table_name} WHERE ?`, condition);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    }
  }

  function DeleteOne(table_name, condition) {
    if (__check_connection() == false) {
      throw new Error("you must call connect() first.");
    }
    if (arguments.length == 1 && typeof table_name === 'string') {
      return new Promise((resolve, reject) => {
        __credentials.query(table_name, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length == 2 && typeof table_name === 'string' && typeof condition === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`DELETE FROM ${table_name} WHERE ? LIMIT 1`, condition);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            reject(err);
          resolve(result);
        });
      });
    }
  }

  /**
   * 
   * @param {*} table_name_1 
   * @param {*} table_name_2 
   * @param {*} condition 
   * SELECT * FROM table_1 table_2 WHERE table_1.id = table_2.id
   */
  function NaturalJoin(table_name_1, table_name_2, condition) {
    let query = '';
    if (__check_connection() == false) {
      throw new Error('you must call connect() first.');
    }
    if (arguments.length === 2 && typeof table_name_1 === 'string' && typeof table_name_2 === 'string') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(` SELECT * FROM ${table_name_1} NATURAL JOIN ${table_name_2}`);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length === 3 && typeof table_name_1 === 'string' && typeof table_name_2 === 'string' && typeof condition === 'object') {
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(` SELECT ? FROM ${table_name_1} NATURAL JOIN ${table_name_2}`, condition);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length == 1 && typeof table_name_1 === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name_1, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else {
      return new Error("wrong no of arguments passed");
    }
  }

  /**
   * 
   * @param {*} table_name_1 
   * @param {*} table_name_2 
   * @param {*} condition
   * function to implement innerJoin. 
   */
  function InnerJoin(table_name_1, table_name_2, condition) {
    if (__check_connection() == false) {
      throw new Error('you must call connect() first.');
    }
    let query = '';
    if (arguments.length == 1 && typeof table_name_1 === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name_1, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length == 3 && typeof table_name_1 === 'string' && typeof table_name_2 === 'string' && typeof condition === 'object') {
      if (condition.length != 1) {
        throw new Error('ON clause should be of length 1');
      }
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`SELECT * FROM ${table_name_1} INNER JOIN ${table_name_2} ON ${table_name_1}.${condition} = ${table_name_2}.${condition}`);
        console.log(query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else {
      throw new Error('wrong no of arguments passed.');
    }
  }

  /**
   * 
   * @param {*} table_name_1 
   * @param {*} table_name_2 
   * @param {*} condition
   * function to implement leftJoin. 
   */
  function LeftJoin(table_name_1, table_name_2, condition) {
    if (__check_connection() == false) {
      throw new Error('you must call connect() first.');
    }
    let query = '';
    if (arguments.length == 1 && typeof table_name_1 === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name_1, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length == 3 && typeof table_name_1 === 'string' && typeof table_name_2 === 'string' && typeof condition === 'object') {
      if (condition.length != 1) {
        throw new Error('ON clause should be of length 1');
      }
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`SELECT * FROM ${table_name_1} LEFT JOIN ${table_name_2} ON ${table_name_1}.${condition} = ${table_name_2}.${condition}`);
        console.log(query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else {
      throw new Error('wrong no of arguments passed.');
    }
  }

  /**
   * 
   * @param {*} table_name_1 
   * @param {*} table_name_2 
   * @param {*} condition
   * function to implement rightJoin. 
   */
  function RightJoin(table_name_1, table_name_2, condition) {
    if (__check_connection() == false) {
      throw new Error('you must call connect() first.');
    }
    let query = '';
    if (arguments.length == 1 && typeof table_name_1 === 'string') {
      return new Promise((resolve, reject) => {
        __credentials["conn"].query(table_name_1, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else if (arguments.length == 3 && typeof table_name_1 === 'string' && typeof table_name_2 === 'string' && typeof condition === 'object') {
      if (condition.length != 1) {
        throw new Error('ON clause should be of length 1');
      }
      return new Promise((resolve, reject) => {
        query = __sqlstring.format(`SELECT * FROM ${table_name_1} RIGHT JOIN ${table_name_2} ON ${table_name_1}.${condition} = ${table_name_2}.${condition}`);
        console.log(query);
        __credentials["conn"].query(query, (err, result) => {
          if (err)
            throw err;
          resolve(result);
        });
      });
    } else {
      throw new Error('wrong no of arguments passed.');
    }
  }

  return {
    connect: Connect,
    setDatabase: setDatabase,
    insert: Insert,
    select: Select,
    update: Update,
    getDatabase: getDatabase,
    getConnectionObject: getConnectionObject,
    selectOne: SelectOne,
    updateOne: UpdateOne,
    delete: Delete,
    deleteOne: DeleteOne,
    naturalJoin: NaturalJoin,
    leftJoin: LeftJoin,
    innerJoin: InnerJoin,
    rightJoin: RightJoin
  }
};