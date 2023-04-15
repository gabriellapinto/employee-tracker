const inquirer = require("inquirer");
const mysql = require('mysql2');
const sequelize = require('./server');

const question = inquirer.prompt([
    {
        type: 'list',
        name: 'actions',
        message: 'What would you like to do?',
        choices: [
            {name: 'View All Departments', value: 0}, 
            {name: 'View All Roles', value: 1}, 
            {name: 'View All Employees', value: 2}, 
            {name: 'Add A Department', value: 3}, 
            {name: 'Add A Role', value: 4}, 
            {name: 'Add An Employee', value: 5}, 
            {name: 'Update An Employee Role', value: 6},
        ]
    }
]) .then((response) => {
       switch(response) {
        case 0:


        break;

        case 1:


        break;

        case 2:


        break;

        case 3:


        break;

        case 4:


        break;

        case 5:


        break;

        case 6:


        break;
       }
    }
);
