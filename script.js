document.addEventListener("DOMContentLoaded", function() {
  const dayButtons = document.querySelectorAll(".day-btn");
  const calendarContainer = document.getElementById("calendar");
  const resultsList = document.getElementById("dates-list");

  // Attach event listeners to day buttons
  dayButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const selectedDay = parseInt(this.getAttribute("data-day"));
      checkDatesByDay(selectedDay);
    });
  });

  // Attach event listener to calendar
  calendarContainer.addEventListener("click", function(event) {
    const selectedDate = event.target.getAttribute("data-date");
    if (selectedDate) {
      checkDatesByDate(selectedDate);
    }
  });

  function checkDatesByDay(day) {
    resultsList.innerHTML = ""; // Clear previous results

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const selectedDates = [];

    for (let year = currentYear; year <= currentYear + 10; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        while (date.getDay() !== day) {
          date.setDate(date.getDate() + 1);
        }
        if (date.getMonth() === month) {
          selectedDates.push(date);
        }
      }
    }

    displayResults(selectedDates);
  }

  function checkDatesByDate(selectedDate) {
    resultsList.innerHTML = ""; // Clear previous results

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const selectedDates = [];

    for (let year = currentYear; year <= currentYear + 10; year++) {
      const date = new Date(selectedDate);
      date.setFullYear(year);
      if (date.getFullYear() === year) {
        selectedDates.push(date);
      }
    }

    displayResults(selectedDates);
  }

  function displayResults(dates) {
    if (dates.length === 0) {
      resultsList.innerHTML = "<li>No matching dates found.</li>";
    } else {
      dates.sort(function(a, b) {
        return a.getTime() - b.getTime();
      });

      const formattedDates = dates.map(formatDate);
      const pairedDates = [];

      for (let i = 0; i < formattedDates.length; i++) {
        if (i % 2 === 0) {
          pairedDates.push(`${formattedDates[i]}`);
        } else {
          pairedDates.push(`${formattedDates[i - 1]}\n${formattedDates[i]}`);
        }
      }

      pairedDates.forEach(function(pair) {
        const li = document.createElement("li");
        li.innerHTML = pair;
        resultsList.appendChild(li);
      });
    }
  }

  function formatDate(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayOfWeek = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  }
});

