// Defining some arrays for the data
let airline = [];
let arrival_d = [];
let passenger_c = [];

// Retrieves data from mockaroo API using FETCH (JS built-in function).
function requestData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#apiTable tbody');
              // For each element in retrieved data - insert it to appropriate table cell (some of them are also pushed into array)
              data.forEach(entry => {
                  const row = tableBody.insertRow();
                  row.insertCell(0).textContent = entry.id;
                  row.insertCell(1).textContent = entry.flight_number;
                  row.insertCell(2).textContent = entry.airline;
                  airline.push(entry.airline);
                  row.insertCell(3).textContent = entry.departure_airport;
                  row.insertCell(4).textContent = entry.arrival_airport;
                  row.insertCell(5).textContent = entry.departure_date;
                  row.insertCell(6).textContent = entry.arrival_date;
                  arrival_d.push(entry.arrival_date);
                  row.insertCell(7).textContent = entry.departure_time;
                  row.insertCell(8).textContent = entry.arrival_time;
                  row.insertCell(9).textContent = entry.passenger_count;
                  passenger_c.push(entry.passenger_count);
                });
                // After that, execute both pieChart and barChart functions
                pieChart();
                barChart();
        });
}

// Takes the data and displays pie chart on the corresponding canvas
function pieChart() {
    // Remove duplicates from airlines array
    let airlineSet = [...new Set(airline)];
    // Define array containing no. of passengers for each of the three chosen airlines
    let linePassengerCount = [0, 0, 0];
    // Take first three airline names
    airlineSet = airlineSet.slice(0, 3);
    // Iterate through three chosen airlines
    for (line1 in airlineSet) {
        // Iterate through all of airlines
        for (line2 in airline) {
            // If they match - add passenger count data from the correct index to the linePassengerCount array
            if (airlineSet[line1] == airline[line2]) {
                linePassengerCount[line1] += passenger_c[line2];
            }
        }  
    }

    // Find the correct canvas and create a chart
    var ctx = document.getElementById("piechart");
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: airlineSet,
            datasets: [{
            label: 'No. of passengers',
            data: linePassengerCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.55)',
                'rgba(54, 162, 235, 0.55)',
                'rgba(255, 206, 86, 0.55)'
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
            responsive: false
        }
    });
}

// Takes the data and displays bar chart on the corresponding canvas
function barChart() {
    // Define array containing no. of arrivals by each month
    let arrivalsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // For all data entries
    for (i=0; i<100; i++) {
        // Slice the 'Arrival date string' in that way so only the month will stay. Next convert it to an int and use it as an index decremented by 1
        // As we get the index of month - we add 1 arrival to the array
        arrivalsByMonth[(Number(arrival_d[i].slice(0, 2))) - 1] ++;
    }

    // Find the correct canvas and create a chart
    var ctx = document.getElementById("barchart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          datasets: [{
            label: 'No. of arrivals',
            data: arrivalsByMonth,
            backgroundColor: [
              'rgba(255, 99, 132, 0.55)',
              'rgba(54, 162, 235, 0.55)',
              'rgba(255, 206, 86, 0.55)',
              'rgba(75, 192, 192, 0.55)',
              'rgba(153, 102, 255, 0.55)',
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