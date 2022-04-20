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
            case "Quit":
               process.exit();

         }
      })
}


// Prints out Employees table
function viewEmployees() {
   db.query(`SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, 
roles.salary, CONCAT(m.first_name, ' ' ,  m.last_name) AS manager
FROM employees e LEFT JOIN employees m ON e.manager_id = m.id
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id ORDER BY id ASC;`, function (err, result) {
      console.table(result);
      mainMenu();
   })

}

// Takes in employee name, role, and manager and adds them to the employees table
function addEmployee() {
   let roles;
   let managers;
   let managersArr
   db.query('SELECT id, title FROM roles', (err, result) => {
      roles = result;
      console.log(roles)

   });
   db.query("SELECT id, first_name, CONCAT(first_name, ' ' ,last_name) AS name FROM employees",
      (err, result) => {
         managers = result
         managersArr = result.map(manager => { return manager.name });
         managersArr.unshift('none');
         console.log("list of managers", managersArr);
         inquirer.prompt([
            {
               type: 'input',
               name: 'fname',
               message: "What is the employee's first name?"
            },
            {
               type: 'input',
               name: 'lname',
               message: "What is the employee's last name?"
            },
            {
               type: 'list',
               name: 'role',
               message: "What is the employee's role?",
               choices: roles.map(role => { return role.title })
            },
            {
               type: 'list',
               name: 'manager',
               message: "Who is the employee's manager?",
               choices: managersArr
            },
         ]).then((data) => {
            let managerId = null;
            let roleId;
            for (let i = 0; i < managers.length; i++) {
               console.log(managers[i].name, data.manager);
               if (managers[i].name == data.manager) {
                  managerId = managers[i].id;
               }
            }
            for (let i = 0; i < roles.length; i++) {
               if (roles[i].title == data.role) {
                  roleId = roles[i].id;
               }
            }
            db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id)
            VALUES ("${data.fname}", "${data.lname}", ${roleId}, ${managerId})
            `)
            console.log(`${data.fname} has been added`)
            mainMenu();
         })

      });
}

// todo
function updateEmployeeRole() {
   let employees;
   let roles;
   db.query("SELECT CONCAT(first_name, ' ' ,last_name) AS name, id FROM employees", (err, result) => {
      employees = result;
      console.log(result);
   });
   db.query("SELECT id, title FROM roles", (err, result) => {
      roles = result;
      console.log("roles")
      inquirer.prompt([
         {
            type: 'list',
            name: 'name',
            message: "Which employee's role do you want to update?",
            choices: employees.map(person => { return person.name })
         },
         {
            type: 'list',
            name: 'role',
            message: "Which role do you want to assign to the selected employee?",
            choices: result.map(role =>{return role.title})
         }
      ]).then((data) => {
         let roleId;
         let employeeId;
         for (let i = 0; i < roles.length; i++) {
            if(roles[i].title == data.role) {
               roleId = roles[i].id
               console.log("role id is" + roleId);
            } 
         }
         for (let i = 0; i < employees.length; i++) {
            if(employees[i].name == data.name) {
               employeeId = employees[i].id
               console.log("employee id is", employeeId)
            }
            
         }
         db.query(`UPDATE employees SET role_id = ${roleId} WHERE id = ?`, employeeId);
         mainMenu()
      });
   
   });
}

// Prints out all roles with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
   db.query(`SELECT roles.id, title, departments.name AS department, salary
FROM roles
JOIN departments ON roles.department_id = departments.id
ORDER BY roles.id ASC;`, function (err, result) {
      console.table(result);
      mainMenu();
   });

}

// Takes in role name, salary and department and adds it to the roles table
async function addRole() {
   let departmentArr = [];
   let departments;
   db.query('SELECT id, name FROM departments'
      , (err, result) => {
         departments = result
         console.log(departments);
         departmentArr = result.map(dep => {
            return dep.name;
         });

         inquirer.prompt([
            {
               type: "input",
               name: "name",
               message: "What is the name of the role?",
            },
            {
               type: 'input',
               name: 'salary',
               message: 'What is the salary of the role?'
            },
            {
               type: 'list',
               name: 'department',
               message: 'What department is this role in?',
               choices: departmentArr,
            }
         ]).then((data) => {
            let deptId;
            for (let i = 0; i < departments.length; i++) {
               if (departments[i].name == data.department) {
                  console.log("reached the if statement", departments[i].name, departments[i].id);
                  deptId = departments[i].id;
               }
            }
            console.log('department id is ' + deptId);
            db.query(`INSERT INTO roles(title, department_id, salary) 
         VALUES ("${data.name}", ${deptId}, ${data.salary})`);
            console.log(data.name + " role has been added");
            mainMenu();
         })
      })



}

// Prints out departments table
function viewAllDepartments() {
   db.query("SELECT * from departments ORDER BY id ASC", function (err, result) {
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
         { name: data.department }, (err) => {
            console.log("Added " + data.department + " to departments.");
            mainMenu();
         })
   })
}

mainMenu();