var app = angular.module("todo", ["ngRoute"]);
var tasks_data = new Array();
//defining contants
app.constant("urls", {
  baseUrl: window.location.origin + "/", //http://localhost/codeang.com/
  apiUrl: window.location.origin + "/api/index.php/", //http://localhost/codeang.com/api/index.php/
  someElseSetting: "settingValue"
});

//defining routes
app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
      controller: "HomeController"
    })
    .when("/login", {
      templateUrl: "login.html",
      controller: "LoginController"
    })
    .when("/register", {
      templateUrl: "register.html",
      controller: "RegisterController"
    })
    .otherwise({ redirectTo: "/" });
});

//home controller
app.controller("HomeController", function($scope) {
  setupStorage();
  if (tasks_data) {
    $scope.tasks = tasks_data;
  } else {
    $scope.tasks = false;
  }
  $scope.submitForm = function() {
    $scope.task.status = "incomplete";
    console.log($scope.task);
    saveTask($scope.task);
  };
});

//register controller
app.controller("registerController", function($scope) {
  var temp;
  if (localStorage.getItem("users")) {
    temp.push(JSON.parse(localStorage.getItem("users")));
  } else {
    localStorage.setItem("users", new Array());
  }
  $scope.form = {};
  var temp = new Array();
  $scope.submitForm = function() {
    console.log($scope.form);

    if (localStorage.getItem("users")) {
      temp.push($scope.form);
      localStorage.setItem("users", JSON.stringify(temp));
    } else {
      localStorage.setItem("users", new Array());
    }
  };
});

//login controller
app.controller("loginController", function($scope) {
  var temp2 = JSON.parse(localStorage.getItem("users"));

  $scope.submitLogin = function() {
    console.log($scope.form);
    var login = temp2.find(element => element.email == $scope.form.email);
    if (login) {
      localStorage.setItem("user_login", login);
    } else {
      localStorage.setItem("user_login", "");
    }
  };
});

//save task
function saveTask(data) {
  console.log("save task is called");
  setupStorage();
  console.log("two");
  tasks_data.push(data);
  localStorage.setItem("tasks", JSON.stringify(tasks_data));
}

//delete task
function deleteTask(data) {
  setupStorage();
  var temp_data = tasks_data.find(element => element.task == data);
  console.log(temp_data);
}

//update task
function updateTask(data) {
  setupStorage();
  var temp_data = tasks_data.find(element => element.name == data);
  console.log(temp_data);
}

//setup localstorage
function setupStorage() {
  if (localStorage.getItem("tasks")) {
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  } else {
    localStorage.setItem("tasks", "");
  }
}
