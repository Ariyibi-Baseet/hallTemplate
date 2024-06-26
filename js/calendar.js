const calendar = document.getElementById("calendar");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.querySelector(".eventTitleInput");
const eventTitleInput02 = document.querySelector(".eventTitleInput02");
const eventText = document.querySelector(".eventText");
const weekdays = document.getElementById("weekdays");

const content = document.querySelector("#content");
const monthDisplay = document.getElementById("monthDisplay");

let nav = 0;
let clicked = null;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

content.onclick = toggle;

(function get_days() {
  for (let i = 0; i < days.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = days[i].substring(0, 3);
    weekdays.appendChild(div);
  }
})();

function toggle(e) {
  const t = e.target;
  if (t.closest(".day")) {
    return null;
  } else if (t.closest(".closeBtn")) {
    closeModal();
  } else if (t.closest(".addBtn")) {
    addEvent(e);
  } else if (t.closest(".updateBtn")) {
    updateEvent(e);
  } else if (t.closest(".removeBtn")) {
    removeEvent();
  } else if (t.closest(".previousBtn")) {
    initPreviousBtn();
  } else if (t.closest(".nextBtn")) {
    initNextBtn();
  } else if (t.closest("#daySquare")) openModal();
}

async function fetchData() {
  try {
    const response = await fetch("software/api.php?name=calendar");
    let data = await response.json();
    let eventData = data.data;
    localStorage.setItem("events", JSON.stringify(eventData));
    loadCalendar();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

function updateEvent(e) {
  e.preventDefault();
  const ref = localStorage.getItem("events");
  if (ref) {
    const events = JSON.parse(ref);
    for (let i = 0; i < events.length; i++) {
      if (events[i].date === clicked) {
        if (
          eventTitleInput02.value.length > 3 &&
          eventTitleInput02.value.length <= 10
        ) {
          eventTitleInput02.classList.remove("error");
          events[i].title = eventTitleInput02.value;
          const event = events[i];
          events.splice(i, 1, event);
          localStorage.setItem("events", JSON.stringify(events));
          eventText.innerHTML = `
          <ul>
            <li>Date : <strong>${events[i].date}</strong></li>
            <li>Event : ${events[i].title}</li>
          </ul>`;
          eventTitleInput02.value = events[i].title;
          loadCalendar();
        } else {
          eventTitleInput02.classList.add("error");
        }
      }
    }
  }
}

function removeEvent() {
  const ref = localStorage.getItem("events");
  if (ref) {
    const events = JSON.parse(ref);
    for (let i = 0; i < events.length; i++) {
      if (events[i].date === clicked) {
        events.splice(i, 1);
        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
        loadCalendar();
      }
    }
  }
}

function initPreviousBtn() {
  nav--;
  loadCalendar();
}

function initNextBtn() {
  nav++;
  loadCalendar();
}

function loadCalendar() {
  calendar.innerHTML = "";

  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const year = dt.getFullYear();
  const month = dt.getMonth();
  const day = dt.getDate();

  const monthString = dt.toLocaleDateString("en-US", { month: "long" });
  monthDisplay.innerHTML = monthString.substring(0, 3) + " " + year;

  const firstDayOfMonth = new Date(year, month, 1);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const dateString = firstDayOfMonth.toLocaleDateString("en-US", options);
  const firstDayWeek = dateString.split(",")[0];
  const paddingDays = days.indexOf(firstDayWeek);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentDay00 = nav == 0 ? dt.toLocaleDateString("en-US", options) : "";
  const currentDay = nav == 0 ? currentDay00.split(",")[1] : "";

  const countDays = paddingDays + daysInMonth;

  let days01 = [];

  for (let i = 1; i <= countDays; i++) {
    const day01 = {
      day: i - paddingDays,
      month: month + 1,
      year: year,
      currentDay: i - paddingDays == day && nav == 0 ? true : false,
    };
    days01.push(day01);
    localStorage.setItem("calendar", JSON.stringify(days01));
  }

  const ref = localStorage.getItem("events");

  for (let i = 0; i < days01.length; i++) {
    const day01 = days01[i].day;
    const dayString =
      days01[i].month + "/" + days01[i].day + "/" + days01[i].year;
    let currentDay = days01[i].currentDay;

    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (day01 > 0) {
      daySquare.setAttribute("data-date", dayString);
      daySquare.textContent = day01;

      if (ref) {
        const events = JSON.parse(ref);
        for (let j = 0; j < events.length; j++) {
          if (
            events[j].date_start == dayString ||
            events[j].date_end == dayString
          ) {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.textContent = "Booked";
            daySquare.appendChild(eventDiv);
          }
        }
      }
    } else {
      daySquare.style.visibility = "hidden";
    }
    if (currentDay) {
      daySquare.setAttribute("id", "currentDay");
    }
    calendar.appendChild(daySquare);
  }
}

loadCalendar();
