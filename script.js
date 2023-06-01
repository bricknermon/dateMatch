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
        const date = new Date(year, month, day);
        if (date.getDay() === day && date.getMonth() === month) {
          selectedDates.push(new Date(date));
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
      if (
        date.getFullYear() === year &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth()
      ) {
        selectedDates.push(new Date(date));
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
  
      let i = 0;
      while (i < dates.length) {
        const date1 = dates[i];
        const date2 = dates[i + 1];
  
        const formattedDate1 = formatDate(date1);
        const formattedDate2 = date2 ? formatDate(date2) : "";
  
        const li1 = document.createElement("li");
        li1.textContent = formattedDate1;
        resultsList.appendChild(li1);
  
        if (date2) {
          const li2 = document.createElement("li");
          li2.textContent = formattedDate2;
          resultsList.appendChild(li2);
        }
  
        i += 2; // Move to the next pair
      }
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


