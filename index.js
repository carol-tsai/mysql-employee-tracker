const inquirer = require('inquirer');
const mysql = require("mysql2");
const table = require("console.table");

const db = mysql.createConnection(
   {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Hello123',
      database: 'company_db'
   },
   console.log(`Connected to the company_db database.`)
);

const menu = [
   {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
         "View All Employees",
         "Add Employee",
         "Update Employee Role",
         "View All Roles",
         "Add Role",
         "View All Departments",
         "Add Department",
         "Quit"
      ]
   }
];

function mainMenu() {
   inquirer.prompt(menu)
      .then((data) => {
         switch (data.menu) {
            case "View All Employees":
               console.log("retrieving list of employees");
               viewEmployees();
               break;
            case "Add Employee":
               addEmployee();
               break;
            case "Update Employee Role":
               updateEmployeeRole();
               break;
            case "View All Roles":
               viewAllRoles();
               break;
            case "Add Role":
               addRole();
               break;
            case "View All Departments":
               viewAllDepartments();
               break;
            case "Add Department":
               addDepartment();
               break;

         }
      })
}


// Prints out Employees table
function viewEmployees() {
   db.query("SELECT * from employees", function(err, result) {
      console.table(result);
      mainMenu();
   })
  
}

// todo
function addEmployee() {
}

// todo
function updateEmployeeRole() {
}

// Prints out roles table
function viewAllRoles() {
   db.query("SELECT * from roles", function (err, result) {
      console.table(result);
      mainMenu();
   })
   
}

// todo
function addRole() {
}

// Prints out departments table
function viewAllDepartments() {
   db.query("SELECT * from departments", function (err, result) {
      console.table(result);
      mainMenu();
   })
}

// Takes an input department name and adds it to the department table
function addDepartment() {
   inquirer.prompt([{
      type: "input",
      name: "department",
      message: "What is the name of the department?",
   }]).then((data) => {
      db.query('INSERT INTO departments SET ?', 
      {name: data.department}, (err) => {
         console.log("Added " + data.department + " to departments.");
         mainMenu();
      })
   })
}

mainMenu();