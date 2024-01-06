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
                    row.insertCell(2).textContent = entry.airline;
                    row.insertCell(3).textContent = entry.departure_airport;
                    row.insertCell(4).textContent = entry.arrival_airport;
                    row.insertCell(5).textContent = entry.departure_date;
                    row.insertCell(6).textContent = entry.arrival_date;
                    row.insertCell(7).textContent = entry.departure_time;
                    row.insertCell(8).textContent = entry.arrival_time;
                    row.insertCell(9).textContent = entry.passenger_count;
                });
            } else {
                console.error("Table body not found.");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}