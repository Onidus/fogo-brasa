//Screen fill

function resize() {
  let screenSize = window.innerHeight;
  let headerSize = document.querySelector("header").offsetHeight;
  let footerSize = document.querySelector("footer").offsetHeight;
  document.getElementById("main").style.minHeight =
    screenSize - headerSize - footerSize + "px";
  document.getElementById("main-container").style.minHeight =
    screenSize - headerSize + "px";
}
resize();
window.onresize = function () {
  resize();
};

//Dropdown menu (mobile)

const dropdownButton = document.querySelector(".header-menu");
const dropdownMenu = document.querySelector(".dropdown");

function toggleMenu() {
  dropdownMenu.classList.toggle("hidden");
}

dropdownButton.onclick = toggleMenu;

//Working hours box

const restStatus = document.getElementById("check-status");
const restOpen = document.getElementById("check-open");
const detailButton = document.getElementById("details");

function checkStatus() {
  let now = new Date();
  let timezone = 9;
  let day = now.getDay();
  let hour = now.getUTCHours() + timezone;
  let minute = now.getMinutes();

  if (day == 1 || day == 2) {
    return [`定休日`, `例日　<span class="focus">水‐日</span>`];
  }
  if (hour < 11 || (hour == 11 && minute < 30)) {
    return [`準備中`, `営業　<span class="focus">11:30</span>`];
  }
  if (hour < 14 || (hour == 14 && minute < 30)) {
    return [`営業中`, `ラストオーダー：<span class="focus">14:30</span>`];
  }
  if (hour < 17 || (hour == 17 && minute < 30)) {
    return [`準備中`, `営業　<span class="focus">17:30</span>`];
  }
  if (hour < 22 || (hour == 22 && minute < 30)) {
    return [`営業中`, `ラストオーダー：<span class="focus">22:30</span>`];
  }
  /*
  if (day == 1 || day == 2) {
    return [`We are closed`, `Open <span class="focus">Wed - Sun</span>`];
  }
  if (hour < 11 || (hour == 11 && minute < 30)) {
    return [`Open soon`, `Open at <span class="focus">11:30</span>`];
  }
  if (hour < 14 || (hour == 14 && minute < 30)) {
    return [`Open`, `Last order: <span class="focus">14:30</span>`];
  }
  if (hour < 17 || (hour == 17 && minute < 30)) {
    return [`Open soon`, `Open at <span class="focus">17:30</span>`];
  }
  if (hour < 22 || (hour == 22 && minute < 30)) {
    return [`Open`, `Last order: <span class="focus">22:30</span>`];
  }
  */
}

function updateStatus() {
  let timetable = checkStatus();
  restStatus.innerHTML = timetable[0];
  restOpen.innerHTML = timetable[1];
}

updateStatus();

function showDetails() {
  document.querySelector(".info-detail").classList.toggle("hidden");
}

detailButton.onclick = showDetails;

//Tabbing

const navHome = document.getElementById("nav-home");
const navMenu = document.getElementById("nav-menu");
const navContact = document.getElementById("nav-contact");
const allPages = document.querySelectorAll("[id^=page-]");
const allNav = document.querySelectorAll("[id^=nav-]");

function togglePage(thisTab, attr) {
  allPages.forEach((page) => {
    page.classList.add("hidden");
  });

  document.getElementById(`page-${attr}`).classList.remove("hidden");

  allNav.forEach((item) => {
    item.classList.remove("active-tab");
  });

  thisTab.classList.add("active-tab");
  toggleMenu();
}

navHome.onclick = function () {
  togglePage(this, "home");
};
navMenu.onclick = function () {
  togglePage(this, "menu");
};
navContact.onclick = function () {
  togglePage(this, "contact");
};

// Reservation form

const reservationDate = document.getElementById("date");
let today = new Date();

reservationDate.value = getDateString(today);
reservationDate.min = getDateString(today);
reservationDate.max = getMaxDateString(today, 14);

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}

function getMaxDateString(date, days) {
  date.setDate(date.getDate() + days);
  return getDateString(date);
}

const reservationTime = document.getElementById("time");

function hourOptions() {
  fifteenMinuteHourLoop(11, 15);
  fifteenMinuteHourLoop(17, 23);
}

function fifteenMinuteHourLoop(startHour, endHour) {
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute = minute + 15) {
      if (hour == startHour) {
        minute == 30;
      }
      if (hour == endHour - 1 && minute == 30) {
        break;
      }
      let minuteStr = "" + minute;
      if (minuteStr == "0") {
        minuteStr = "00";
      }
      reservationTime.innerHTML += `<option value=${hour}${minuteStr}>${hour}:${minuteStr}</option>`;
    }
  }
}

hourOptions();
