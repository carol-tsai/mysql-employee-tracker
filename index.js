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


// todo
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

// todo
function viewAllRoles() {
   db.query("SELECT * from roles", function (err, result) {
      console.table(result);
      mainMenu();
   })
   
}

// todo
function addRole() {
}

// todo
function viewAllDepartments() {
}

// todo
function addDepartment() {
}

mainMenu();