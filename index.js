const inquirer = require("inquirer");
const db = require('./connection');
const cTable = require('console.table');
const {determineDBQuery, addDepartment, addRole, getAllRoles, getAllDepartments, getAllEmployees, addEmployee, updateEmployee } = require('./query.js');

const questions = [
    {
        type: 'list',
        name: 'actions',
        message: 'What would you like to do?',
        choices: [
            'View All Departments', 
            'View All Roles', 
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role',
            'Quit'
        ]
    },
    {
        type: "input",
        message: "Please enter the name of the department you would like to add",
        name: "addDepartment",
        validate: function (addDepartment) {
            if (addDepartment === null || addDepartment.length === 0) {
                return "Please enter something first, or quit with: CTRL + C";
            }
            return true;
        },
        when: function (answers) {
            return answers.actions === "Add a Department"
        }
    },
    {
        type: "list",
        message: "Please select the department this role will be added to:",
        name: "addRole_department_id",
        choices: getAllDepartments,
        when: function (answers) {
            return answers.actions === "Add a Role"
        }
    },
    {
        type: "input",
        message: "Please enter the title of this role:",
        name: "addRole_title",
        validate: function (addRole_title) {
            if (addRole_title === null || addRole_title.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.actions === "Add a Role"
        }
    },
    {
        type: "number",
        message: "Please enter the salary of this role:",
        name: "addRole_salary",
        validate: function (addRole_salary) {
            if (typeof addRole_salary !== 'number' || addRole_salary.length === 0){
                return false;
            }
            return true;
        },
        when: function (answers) {
            return answers.actions === "Add a Role"
        }
    },
    {
        type: "input",
        message: "Please enter the first name of the new employee.",
        name: "addEmployee_fn",
        validate: function (addEmployee_fn) {
            if (addEmployee_fn === null || addEmployee_fn.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.actions === "Add an Employee"
        }
    },
    {
        type: "input",
        message: "Please enter the last name of the new employee.",
        name: "addEmployee_ln",
        validate: function (addEmployee_ln) {
            if (addEmployee_ln === null || addEmployee_ln.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.actions === "Add an Employee"
        }
    },
    {
        type: "list",
        message: "Please select the role of the employee:",
        name: "addEmployee_role_title",
        choices: getAllRoles,
        when: function (answers) {
            return answers.actions === "Add an Employee"
        }
    },
    {
        type: "list",
        message: "Please select this employee's manager",
        name: "addEmployee_manager",
        choices: getAllEmployees,
        when: function (answers) {
            return answers.actions === "Add an Employee"
        }
    },
    {
        type: "list",
        message: "Please select the employee you would like to update:",
        name: "update_employee_name",
        choices: getAllEmployees,
        when: function (answers) {
            return answers.actions === "Update an Employee Role"
        }
    },
    {
        type: "list",
        message: "Please select the new role for this employee",
        name: "update_employee_role",
        choices: getAllRoles,
        when: function (answers) {
            return answers.actions === "Update an Employee Role"
        }
    },
    {
        type: "confirm",
        message: "End the program?",
        name: "endProgram",
        when: function (answers) {
            return answers.actions === "Quit"
        }
    }
]; 

function runQuestions() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);
            if (answers.addRole_department_id && answers.addRole_title && answers.addRole_salary) {
                addRole(answers.addRole_department_id, answers.addRole_title, answers.addRole_salary);
            } else if (answers.addEmployee_fn && answers.addEmployee_ln && answers.addEmployee_role_title && answers.addEmployee_manager) {
                addEmployee(answers.addEmployee_fn, answers.addEmployee_ln, answers.addEmployee_role_title, answers.addEmployee_manager);

            } else if (answers.update_employee_name && answers.update_employee_role) {
                updateEmployee(answers.update_employee_role, answers.update_employee_name);
            

            } else if (answers.actions === "Add a Department") {
                addDepartment(answers.addDepartment);
   
            } else {
                determineDBQuery(answers.actions);
            }
             setTimeout(function () {
                if (answers.endProgram) {
                    console.log("See you later!")
                } else {
                    runQuestions()
                }
            }, 250)
        })
        .catch((error) => {
            console.log(error)
        })
}

runQuestions();
