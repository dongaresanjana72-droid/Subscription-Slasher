fetch('data.json')
  .then(res => res.json())
  .then(data => {

    let map = {};

    data.forEach(item => {
      if (!map[item.name]) {
        map[item.name] = {
          name: item.name,
          total: 0,
          count: 0,
          usage: item.usage || "medium"
        };
      }

      map[item.name].total += item.amount;
      map[item.name].count++;
    });

    let subscriptions = [];
    let totalCost = 0;

    for (let key in map) {
      if (map[key].count > 1) {
        subscriptions.push(map[key]);
        totalCost += map[key].total;
      }
    }

    // 👉 Total
    document.getElementById("total").innerText = "₹" + totalCost;

    // 👉 List
    let list = document.getElementById("list");
    list.innerHTML = "";

    // 👉 Suggestions
    let suggestionList = document.getElementById("suggestions");
    suggestionList.innerHTML = "";

    subscriptions.forEach(sub => {

      // List
      let li = document.createElement("li");
      li.innerText = sub.name + " - ₹" + sub.total;
      list.appendChild(li);

      // Suggestion Logic
      let suggestion = "";
      let className = "";

      if (sub.usage === "low") {
        suggestion = "❌ Cancel";
        className = "cancel";
      } else if (sub.usage === "medium") {
        suggestion = "⚠️ Consider";
        className = "consider";
      } else {
        suggestion = "✅ Keep";
        className = "keep";
      }

      let sug = document.createElement("li");
      sug.innerHTML = `${sub.name} → <span class="${className}">${suggestion}</span>`;
      suggestionList.appendChild(sug);
    });

    // 👉 Chart
    let names = subscriptions.map(s => s.name);
    let prices = subscriptions.map(s => s.total);

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: names,
        datasets: [{
          data: prices,
          backgroundColor: ['#E50914', '#1DB954', '#f39c12', '#3498db']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }
    });

  });
