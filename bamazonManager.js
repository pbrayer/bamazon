var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.log("error connecting to database.")
  }
  managerOptions()
});

function managerOptions() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          productSearch();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addProduct();
          break;
            
        case "exit":
          connection.end();
          break;
        }
      });
  }

  function productSearch(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log("Thank you for visiting bamazon.\n")
        console.log("Here are our products: \n")
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id);
        console.log("Name: " + res[i].product_name);
        console.log("Department: " + res[i].department_name);
        console.log("Price: " + res[i].price + " Gold");
        console.log("Quantity Available: " + res[i].stock_quantity);
        console.log("\n")
      }
      managerOptions();
    });
  }

  function lowInventory(){
    var query = "SELECT * FROM products where stock_quantity < 5";
    connection.query(query, function(err, res) {
        console.log("Greetings manager. here are all items with a quantity less than 5: \n")
        for(var i = 0; i < res.length; i++){
            console.log("Item ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Quantity Available: " + res[i].stock_quantity);
            console.log("\n")
        }
    managerOptions();
  });
}

function addInventory(){
    inquirer
    .prompt([
        {
      name: "id",
      type: "input",
      message: "Which item ID would you like to add more of?",
    },
    {
        name: "amount",
        type: "input",
        message: "How many units of this item?",
      }
    ])
    .then(function(answer) {
        var itemChoice = answer.id
        var itemQuant = answer.amount
        var query = "UPDATE products SET stock_quantity = stock_quantity + " + itemQuant + " WHERE item_id = " + itemChoice + ""
        console.log("\nOk. Purchasing " + itemQuant + " units of  item ID " + itemChoice + " for the store.\n")
        connection.query(query, {item_id: itemChoice}, function(err, res) {
        });
   managerOptions();
});
}

function addProduct(){
    inquirer
    .prompt([
        {
      name: "name",
      type: "input",
      message: "Please enter name of this new item:",
    },
    {
        name: "department",
        type: "input",
        message: "What department will it be located in?",
      },
      {
        name: "price",
        type: "input",
        message: "How much will it sell for?",
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of these items will we have initially?",
      },
    ])
    .then(function(answer) {
        console.log("Ok. Added " + answer.name + " to the store!\n")
        var query =  "INSERT INTO products SET ?"
        connection.query(query, {product_name: answer.name, department_name: answer.department, price: answer.price, stock_quantity: answer.quantity}, function(err, res) {
        });
      managerOptions();
    });
}