# nodeMYSQL

Simplifies Your MYSQL queries.

## Usage

<!-- eslint-disable no-unused-vars -->

```js
var nodeMYSQL = require('nodeMYSQL');
```

### Escaping query values

**Caution** These methods of escaping values only works when the
[NO_BACKSLASH_ESCAPES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_no_backslash_escapes)
SQL mode is disabled (which is the default state for MySQL servers).

In order to avoid SQL Injection attacks user input is already escaped.

```js
//To establish a connection to database. 
var conn = nodeMYSQL();
conn.connect('127.0.0.1','__your_username__','__your_password__')
 .then(function(result){
   console.log(result); //Connection Established.
 })
 .catch(function(error){
   throw error; //Throws Error if some error is generated.
 });
```

To set the database name you can use following method:

```js
conn.setDatabase('__your_Database_name');
```

You could also pass the database_name to the connect() function as fourth parameter
as shown below:

```js
conn.connect('127.0.0.1','__your_username','your_password','your_Database_name')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To create a table in MYSQL database simply pass in table_name as first argument and columns in the form of array 
in second arguments.For Ex:Following example shows How to create a table `Student` with columns `student_name` and
`student_roll_no`.

```js
conn.create('employee',['student_name VARCHAR(255)','student_roll_no int PRIMARY KEY '])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To insert data into database we can use either ways:

Method-1:By passing Table_name as First Argument in the function and Values as Second Argument.

```js
conn.insert('employee',{
  student_name:"Jon Doe",
  student_roll_no:"123456"
})
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
  OR

Method-2:By passing MYSQL query as Argument in the function.

```js
conn.insert(" INSERT INTO EMPLOYEE VALUES('JonDoe','12345')")
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To select data from database we can use either methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.select('SELECT * FROM employee')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

Method-2:Simply passing table_name as first argument in the function and select parameter in the form of array as
the second argument.

```js
conn.select('employee',['*'])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
OR 

```js
conn.select('employee',['student_name'])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
Method-3:Simply passing table_name as first argument in the function and select condition as the second argument.
However you can only pass one condition in the second parameter.

```js
conn.select('employee',{
  student_name:"John Doe"
})
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
Method-4:Simply passing table_name as first argument in the function and desired columns in the form of array as
the second argument and select condition in the third argument.

```js
conn.select('employee',['student_name'],{
  student_roll_no:12345
})
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
**Note** To Limit your result to only single result,you could use `selectOne()` with the similar functionalities
         as described above.

To select data from database we can use either methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.update("Update student SET student_name='ABCD'")
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

Method-2:Simply passing table_name as first argument in the function and select parameter in the form of array as
the second argument.

```js
conn.update('student',{
  student_name:'12345'
})
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
Method-3:Simply passing table_name as first argument in the function and select condition as the second argument.
However you can only pass one condition in the second parameter.

```js
conn.update('student',{
  student_name:"ABCDE"
  },{
  student_name:"John Doe"
})
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

**Note** To Limit your update to only single column,you could use `updateOne()` with the similar functionalities
         as described above.

To delete data from database we can use either methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.delete("DELETE FROM student WHERE student_name='John Doe' ")
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

Method-2:Simply passing table_name as first argument in the function and delete parameter in the form of object as
the second argument.

```js
conn.delete('student',{
  student_name:'John Doe'
})
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
Method-3:To delete a table Completely simply use `deleteTable()` with table_name as only argument.

```js
conn.deleteTable('student')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 }); 
```

**Note** To Limit your result to only single result,you could use `deleteOne()` with the similar functionalities
         as described above.

To implement Natural Join you can use following methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.naturalJoin('SELECT * FROM table_1 NATURAL JOIN table_2')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
Method-2:Simply passing First table and Second table name as argument to the function.

```js
conn.naturalJoin('first_table_name','second_table_name')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 }); 
```

Method-3:Simply passing First table and Second table name as well as select parameter as third argument in
the function.

```js
conn.naturalJoin('student','employee',['student_name','employee_name'])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To implement Inner Join you can use following methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.innerJoin('SELECT * FROM table_1 INNER JOIN table_2 ON table_1.some_condition = table_2.some_condition')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

Method-2:Simply passing First table and Second table name as well as ON clause as third argument in
the function.

```js
conn.innerJoin('student','employee',['name'])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```
To implement Right Join you can use following methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.rightJoin('SELECT * FROM table_1 RIGHT JOIN table_2 ON table_1.some_condition = table_2.some_condition')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

Method-2:Simply passing First table and Second table name as well as ON clause as third argument in
the function.

```js
conn.rightJoin('student','employee',['name'])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To implement Left Join you can use following methods:

Method-1:Simply passing MYSQL query as argument in the function.

```js
conn.leftJoin('SELECT * FROM table_1 INNER JOIN table_2 ON table_1.some_condition = table_2.some_condition')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

Method-2:Simply passing First table and Second table name as well as ON clause as third argument in
the function.

```js
conn.leftJoin('student','employee',['name'])
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To get the MYSQL connection object user can simply user `getConnectionObject()` method.

```js
var obj=conn.getConnectionObject();
obj.query('SELECT * FROM student',function(err,result){
 if(err)
  throw err;
 //resolve result
});
```
To simply execute a MYSQL query we can use `query()`
method.

```js
conn.query('SELECT * FROM student')
 .then((result)=>{
   //result
 })
 .catch((error)=>{
   //error
 });
```

To get the current database on which user is working we can use `getDatabase()` method.

```js
var database_name=conn.getDatabase();
console.log(database_name);
```

## License

[MIT](LICENSE)

