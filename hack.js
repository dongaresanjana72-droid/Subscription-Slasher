let isSignup = false;
let chart;
let data = JSON.parse(localStorage.getItem("subs")) || [];

// TOGGLE LOGIN/SIGNUP
function toggleForm(){
  isSignup = !isSignup;

  document.getElementById("formTitle").innerText =
    isSignup ? "Sign Up" : "Login";

  document.querySelector(".link").innerText =
    isSignup ? "Already have account? Login" : "Don't have account? Sign Up";
}

// LOGIN / SIGNUP
function login(){
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if(!user || !pass){
    alert("Fill details");
    return;
  }

  if(isSignup){
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    alert("Signup Success! Now Login");
    toggleForm();
  } else {
    let savedUser = localStorage.getItem("user");
    let savedPass = localStorage.getItem("pass");

    if(user === savedUser && pass === savedPass){
      document.getElementById("authBox").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      loadDashboard();
    } else {
      alert("Wrong credentials");
    }
  }
}

// THEME
function toggleTheme(){
  document.body.classList.toggle("light");
}

// ADD
function addData(){
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  let usage = document.getElementById("usage").value;

  if(name && amount){
    data.push({name, amount:Number(amount), usage});
    localStorage.setItem("subs", JSON.stringify(data));
    loadDashboard();
  }
}

// DELETE
function deleteData(index){
  data.splice(index,1);
  localStorage.setItem("subs", JSON.stringify(data));
  loadDashboard();
}

// LOAD DASHBOARD
function loadDashboard(){

  let list = document.getElementById("list");
  let suggestions = document.getElementById("suggestions");

  list.innerHTML = "";
  suggestions.innerHTML = "";

  let total = 0;
  let names = [];
  let prices = [];

  data.forEach((item,i)=>{
    total += item.amount;

    let li = document.createElement("li");
    li.innerHTML = item.name + " ₹" + item.amount +
      ` <button onclick="deleteData(${i})">❌</button>`;
    list.appendChild(li);

    let cls = item.usage==="low"?"cancel":item.usage==="medium"?"consider":"keep";
    let text = item.usage==="low"?"Cancel":item.usage==="medium"?"Consider":"Keep";

    let sug = document.createElement("li");
    sug.innerHTML = item.name + " → <span class='"+cls+"'>"+text+"</span>";
    suggestions.appendChild(sug);

    names.push(item.name);
    prices.push(item.amount);
  });

  document.getElementById("total").innerText = total;

  // FIXED CHART
  if(chart){
    chart.destroy();
  }

  chart = new Chart(document.getElementById("myChart"), {
    type:'doughnut',
    data:{
      labels:names,
      datasets:[{
        data:prices
      }]
    }
  });
}
