let inquirer = require ('inquirer');
let cTable = require ('console.table');
let mysql = require ('mysql2');

//Connect to employee_db;
let employee_db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Oneway0725@',
        database: 'employee_db',
    },
    console.log(`Connect to the movie_db database.`)
)


//start the application; 
startApplication();

function startApplication() {
inquirer
 .prompt ([
    {type: 'list',
     name: 'employeeTracker',
     message: 'What do you like to do?',
     choices: ['View all department', 'Add a department', 'View all roles', 
               'Add a role', 'View all employees', 'Add an employee', 
               'Update an employee role', 'Exist']
    }
 ])
 .then (response => {
    const {employeeTracker} = response;
    console.log(employeeTracker);
    switch(employeeTracker) {
        case 'View all department':
           viewAllDepartment();
        break
        case 'Add a department':
           addDepartment();
        break;
        case 'View all roles':
            viewAllRoles();
        break;
        case 'Add a role':
            addRole();           
        break;
        case 'View all employees':
            viewAllEmployee();
        break;
        case 'Add an employee':
            addNewEmployee();
        break;
        case 'Update an employee role':
            UpdateEmployee();
        break;
        case 'Exist':
            console.log("Bye")
        break;
    }
 })};


 //  get the department table;
function viewAllDepartment(){
    employee_db.query(`select * from department`, (err, result)=>{
        if(err) {
            console.log(err);
        } const departmentList = result.map(({id, name}) => ({name: name, value: id}))
        console.table(departmentList)
        startApplication();
    })
  };    


// // get the roles table;
function viewAllRoles(){
    employee_db.query(`SELECT role.id, role.title, role.salary, department.name as department_name
    FROM role 
    JOIN department ON role.department_id = department.id;`, (err, result)=>{
        if(err) {
            console.log(err);
        } 
         console.table(result)
         startApplication();
    
    })}; 

// //view all employee information;
function viewAllEmployee(){
    const selectEmployee = 
`SELECT 
    employOne.id as employee_id, 
    concat(employOne.first_name, ' ',employOne.last_name) as employee_name, 
    concat(employTwo.first_name, ' ',employTwo.last_name) as manager, 
    rd.title, 
    rd.name as department, 
    rd.salary
FROM employee as employOne
LEFT JOIN employee as employTwo 
ON employOne.manager_id = employTwo.id
LEFT JOIN
    (SELECT role.id, role.title, department.name, role.salary
    FROM role
    JOIN department ON department_id = department.id) as rd 
ON employOne.role_id = rd.id;`

    employee_db.query(selectEmployee, (err, result)=>{
        if(err) {
            console.log(err);
        } 
        console.table(result)
        startApplication();
    })
      
    }; 


//add a new department;
async function addDepartment() {
const response = await inquirer
  .prompt([ 
    {
      type:'input',
      name: 'department',
      message: 'Please enter the new department name here.'
    }
  ]);
    const newDepartment = response.department;
    const addNewDepartment = `INSERT INTO department (name) VALUES ('${newDepartment}');`;
    employee_db.query(addNewDepartment, newDepartment, (err, result)=>{
        if(err) {
            console.log(err);
        } return console.log(`Add ${newDepartment} to department`);
    })
viewAllDepartment();
}


// //add a new role;
async function addRole() {
//get all the department list including those new add;

  const result = await employee_db.promise().query(`select * from department`)
        const departmentList = result[0].map(({id, name}) => ({name: name, value: id}))//the promise first return the result that we 
  const response = await inquirer
  .prompt([
    {
      type:'input',
      name: 'title',
      message: 'Please enter the new role title here.' 
    },
    {
      type:'input',
      name: 'salary',
      message: 'Please enter the salary of the new role here.' 
    },    
    {
      type:'list',
      name: 'department_id', //the name have to be same name as the in the schema.sql;
      message: 'Please select the department of the role',
      choices: departmentList
    },    
  ])
    const addRoleTitleSalary = `INSERT INTO role set ?`;
    await employee_db.promise().query(addRoleTitleSalary, response);
    viewAllRoles();
    };

//add a new employee;
async function addNewEmployee() {
   const roleTitle = await employee_db.promise().query(`select title, id from role`)
         const roleList = roleTitle[0].map(({id, title}) => ({name: title, value: id}))
   const manager = await employee_db.promise().query(`select concat (first_name,' ', last_name) as manager_name, id from employee`)
         const managerList = manager[0].map(({id, manager_name}) => ({name: manager_name, value: id}))
   const response =  await inquirer
   .prompt([
    {
      type:'input',
      name: 'first_name',
      message: `Please enter the new employee' first name.` 
    },
    {
      type:'input',
      name: 'last_name',
      message: `Please enter the new employee' last name.` 
    },
    {
      type:'list',
      name: 'role_id',
      message: `Please select the new employee's role.`,
      choices: roleList
    },
    {
      type:'list',
      name: 'manager_id',
      message: `Please select the new employee's manager.`,
      choices: managerList
    },
   ])
   const addNew = `INSERT INTO employee set ?`;
   await employee_db.promise().query(addNew, response);
   viewAllEmployee();
}


//update an employee role;
async function UpdateEmployee() {
    const employeeS = await employee_db.promise().query(`select id, concat (first_name,' ', last_name) as employee_name, id from employee`)
          const theEmployee = employeeS[0].map(({id,employee_name})=>({name: employee_name, value:id}));
    const roleTitle = await employee_db.promise().query(`select title, id from role`)
          const roleList = roleTitle[0].map(({id, title}) => ({name: title, value: id}))  
    const response = await inquirer
    .prompt ([
        {
          type:'list',
          name: 'id',
          message: `Please select the employee that you want to update.`,
          choices: theEmployee
          },
        {
            type:'list',
            name: 'role_id',
            message: `Please select the employee's new role`,
            choices: roleList
          },
    ])
    const {id, role_id} = response;
    const updateRole = `UPDATE employee SET role_id = '${role_id}' WHERE id = '${id}' ;`
    await employee_db.promise().query(updateRole);
    viewAllEmployee();
}
