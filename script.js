const daysContainer = document.querySelector('.days');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const month = document.querySelector('.month');
const todayBtn = document.querySelector('.today-btn');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup-content');
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const date = new Date();

let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function renderCalendar() {
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let daysHTML = '';

  for (let x = firstDay.getDay(); x > 0; x--) {
    daysHTML += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDayDate; i++) {
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      daysHTML += `<div class="day today" data-day="${i}">${i}</div>`;
    } else {
      daysHTML += `<div class="day" data-day="${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    daysHTML += `<div class="day next" data-day="${j}">${j}</div>`;
  }

  hideTodayBtn();
  daysContainer.innerHTML = daysHTML;

  // Add event listeners to each day
  const allDays = document.querySelectorAll('.day');
  allDays.forEach((day) => {
    day.addEventListener('click', () => {
      const prevToday = document.querySelector('.day.today');
      if (prevToday) {
        prevToday.classList.remove('today');
      }

      day.classList.add('today');
      console.log(day.dataset.day);
      // Show popup with details
      showPopup(day.dataset.day);
    });
  });
}

function showPopup(day) {
  popup.style.opacity = 1;
  popup.style.transform = 'translateY(0)';

  // Add a timeout to ensure styles are applied before adding the class
  setTimeout(() => {
    popup.classList.add('animate');
  }, 0);
}

function hidePopup() {
  popup.classList.remove('animate');
}

renderCalendar();

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
  hidePopup();
});

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
  hidePopup();
});

todayBtn.addEventListener('click', () => {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  renderCalendar();
  hidePopup();
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  if (!popup.contains(e.target) && !todayBtn.contains(e.target)) {
    hidePopup();
  }
});

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = 'none';
  } else {
    todayBtn.style.display = 'flex';
  }
}
