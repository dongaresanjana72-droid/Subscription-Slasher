fetch("data.json")
  .then(res => res.json())
  .then(data => {
    let subscriptions = findSubscriptions(data);
    displaySubscriptions(subscriptions);
    createChart(subscriptions);
  });

function findSubscriptions(data) {
  let map = {};
  let result = [];

  data.forEach(item => {
    let key = item.name + "-" + item.amount;

    if (!map[key]) {
      map[key] = { ...item, count: 1 };
    } else {
      map[key].count++;
    }
  });

  for (let key in map) {
    if (map[key].count > 1) {
      result.push(map[key]);
    }
  }

  return result;
}

function displaySubscriptions(subs) {
  let list = document.getElementById("list");
  let total = 0;

  subs.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.amount}`;
    list.appendChild(li);

    total += item.amount;
  });

  document.getElementById("total").textContent = total;
}

function createChart(subs) {
  let names = subs.map(s => s.name);
  let amounts = subs.map(s => s.amount);

  new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: names,
      datasets: [{
        data: amounts
      }]
    }
  });
}