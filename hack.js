fetch('data.json')
.then(res => res.json())
.then(data => {

  let total = 0;

  let list = document.getElementById("list");
  let suggestions = document.getElementById("suggestions");

  let names = [];
  let prices = [];

  data.forEach(item => {

    total += item.amount;

    // List
    let li = document.createElement("li");
    li.innerText = item.name + " ₹" + item.amount;
    list.appendChild(li);

    // Suggestions
    let sug = document.createElement("li");

    let text = "";
    let cls = "";

    if(item.usage === "low"){
      text = "❌ Cancel";
      cls = "cancel";
    } else if(item.usage === "medium"){
      text = "⚠️ Consider";
      cls = "consider";
    } else {
      text = "✅ Keep";
      cls = "keep";
    }

    sug.innerHTML = item.name + " → <span class='"+cls+"'>" + text + "</span>";
    suggestions.appendChild(sug);

    names.push(item.name);
    prices.push(item.amount);
  });

  // Animated Total
  let count = 0;
  let interval = setInterval(()=>{
    count += Math.ceil(total/30);
    if(count >= total){
      count = total;
      clearInterval(interval);
    }
    document.getElementById("total").innerText = count;
  },30);

  // Chart
  new Chart(document.getElementById("myChart"), {
    type: 'doughnut',
    data: {
      labels: names,
      datasets: [{
        data: prices,
        backgroundColor: ['#ff00f7','#00f0ff','#00ff99','#ffc107']
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      }
    }
  });

});
