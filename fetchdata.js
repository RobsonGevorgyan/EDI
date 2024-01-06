let fn = [];
let airline = [];
let departure_a = [];
let arrival_a = [];
let departure_d = [];
let arrival_d = [];
let departure_t = [];
let arrival_t = [];
let passenger_c = [];

function requestData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#apiTable tbody');
            if (tableBody) {
                data.forEach(entry => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = entry.id;
                    row.insertCell(1).textContent = entry.flight_number;
                    fn.push(entry.flight_number);
                    row.insertCell(2).textContent = entry.airline;
                    airline.push(entry.airline);
                    row.insertCell(3).textContent = entry.departure_airport;
                    departure_a.push(entry.departure_airport);
                    row.insertCell(4).textContent = entry.arrival_airport;
                    arrival_a.push(entry.arrival_airport);
                    row.insertCell(5).textContent = entry.departure_date;
                    departure_d.push(entry.departure_date);
                    row.insertCell(6).textContent = entry.arrival_date;
                    arrival_d.push(entry.arrival_date);
                    row.insertCell(7).textContent = entry.departure_time;
                    departure_t.push(entry.departure_time);
                    row.insertCell(8).textContent = entry.arrival_time;
                    arrival_t.push(entry.arrival_time);
                    row.insertCell(9).textContent = entry.passenger_count;
                    passenger_c.push(entry.passenger_count);
                });

                pieChart();
                barChart();
            } else {
                console.error("Table body not found.");
            }
        });
}

function pieChart() {
    let airlineSet = [...new Set(airline)];
    let linePassengerCount = [0, 0, 0];
    airlineSet = airlineSet.slice(0, 3);
    for (line1 in airlineSet) {
        for (line2 in airline) {
            if (airlineSet[line1] == airline[line2]) {
                linePassengerCount[line1] += passenger_c[line2];
            }
        }  
    }

    var ctx = document.getElementById("piechart");
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: airlineSet,
            datasets: [{
            label: 'No. of passengers',
            data: linePassengerCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
            }]
        },
        options: {
            //cutoutPercentage: 40,
            responsive: false,
        }
    });
}

function barChart() {
    let arrivalsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i=0; i<100; i++) {
        arrivalsByMonth[(Number(arrival_d[i].slice(0, 2))) - 1] ++;
    }

    var ctx = document.getElementById("barchart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          datasets: [{
            label: 'No. of arrivals',
            data: arrivalsByMonth,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false,
          scales: {
            xAxes: [{
              ticks: {
                maxRotation: 90,
                minRotation: 80
              },
                gridLines: {
                offsetGridLines: true
              }
            },
            {
              position: "top",
              ticks: {
                maxRotation: 90,
                minRotation: 80
              },
              gridLines: {
                offsetGridLines: true
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
    });
}