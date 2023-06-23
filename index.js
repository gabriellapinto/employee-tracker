const inquirer = require("inquirer");
const db = require('./connection');

const question = inquirer.prompt([
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
            return answers.mainList === "Add a Department"
        }
    },
    {
        type: "list",
        message: "Please select the department this role will be added to:",
        name: "addRole_department_id",
        choices: getAllDepartments,
        when: function (answers) {
            return answers.mainList === "Add a Role"
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
            return answers.mainList === "Add a Role"
        }
    },
]) .then((response) => {
    }
);
