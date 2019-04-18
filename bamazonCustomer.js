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
  listItems()
});

function listItems(){
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
      buyItem();
    });
  }


function buyItem() {
  inquirer
    .prompt([
        {
      name: "id",
      type: "input",
      message: "Which item ID would you like to purchase?",
    },
    {
        name: "amount",
        type: "input",
        message: "How many units of this item?",
      }
    ])
    .then(function(answer) {
        var itemChoice = answer.id
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {item_id: itemChoice}, function(err, res) {

      if (answer.amount > res[0].stock_quantity){
        console.log("Sorry, you want " + answer.amount + " of this item and there are only " + res[0].stock_quantity + " available.\n")
        console.log("\nPlease enter any key to view our stock again.")
      }

     if (answer.amount < res[0].stock_quantity && answer.amount != 0 || answer.amount == res[0].stock_quantity){
        var newQuant = res[0].stock_quantity - answer.amount
        var query = "UPDATE products SET stock_quantity = " + newQuant + " WHERE item_id = " + itemChoice + ""
        var totalCost = answer.amount * res[0].price
        console.log("\nOk. Purchasing " + answer.amount + " of  " + res[0].product_name + ".")
        console.log("\nTotal cost is: " + totalCost + " gold" + "\n")
        console.log("\nPlease enter any key to view our stock again.")
        connection.query(query, function(err, res) {
        });
     }

     if (answer.amount == 0 || answer.amount == null){
        console.log("Either you don't want any or an error occurred. Sorry about that.\n")
        console.log("Please enter any key to view our stock again.")
     }
      });
      inquirer
      .prompt({
          name: "any",
          type: "input",
          message: ""
      })
      .then(function(answer){
      if(answer.any != null){
      listItems()
      }
    });
    });
}
