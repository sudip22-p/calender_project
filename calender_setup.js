const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevIcon = document.getElementById("prev"),
    nextIcon = document.getElementById("next");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

let firstDayofMonth;//for accessing to calculate week num

//for final time of appointment
let appointmentTime,
    appointmentDay;

let timeErrorMsg;//for removing-error from validate_form.js file name changed for sorting error:
const renderCalendar = () => {
    let isPastDay = 0;
    let daysCreated = 0;
    let weekNo = 0;
    // Calculate first day of the month (0 for Sunday, 1 for Monday, and so on)
    firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    firstDayofMonth = (firstDayofMonth === 0) ? 6 : firstDayofMonth - 1;  // Adjust to start from Monday (0 for Monday, 6 for Sunday)

    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive past">${lastDateofLastMonth - i + 1}</li>`;
        daysCreated += 1;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of the current month
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        isPastDay += i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? 1 : 0;
        if (currMonth > new Date().getMonth() || currYear > new Date().getFullYear()) {
            isPastDay = 1;
        }
        if (isPastDay == 0) {
            liTag += `<li class="${isToday} past">${i}</li>`;
        } else {
            liTag += `<li class="${isToday}">${i}</li>`;
        }
        daysCreated += 1;
        if (daysCreated % 7 == 0) {
            weekNo += 1;
            liTag += `<li class="time-slot" id="below-week-${weekNo}">
                <span class="time time-slot-9">09:00 am</span>
                <span class="time time-slot-10">10:00 am</span>
                <span class="time time-slot-11">11:00 am</span>
                <span class="time time-slot-12">12:00 pm</span>
                <span class="time time-slot-1">01:00 pm</span>
                <span class="time time-slot-2">02:00 pm</span>
                <span class="time time-slot-3">03:00 pm</span>
                <span class="time time-slot-4">04:00 pm</span>
                <span class="time time-slot-5">05:00 pm</span>
            </li>`;
        }
    }

    // Adjust the loop for creating next month's first days
    let daysAfterLastDay = 7 - lastDayofMonth;  // Days to add to complete the row
    if (daysAfterLastDay === 7) {
        daysAfterLastDay = 0;
    }
    for (let i = 1; i <= daysAfterLastDay; i++) {
        liTag += `<li class="inactive">${i}</li>`;
        daysCreated += 1;
        if (daysCreated % 7 == 0) {
            weekNo += 1;
            liTag += `<li class="time-slot" id="below-week-${weekNo}">
                <span class="time time-slot-9">09:00 am</span>
                <span class="time time-slot-10">10:00 am</span>
                <span class="time time-slot-11">11:00 am</span>
                <span class="time time-slot-12">12:00 pm</span>
                <span class="time time-slot-1">01:00 pm</span>
                <span class="time time-slot-2">02:00 pm</span>
                <span class="time time-slot-3">03:00 pm</span>
                <span class="time time-slot-4">04:00 pm</span>
                <span class="time time-slot-5">05:00 pm</span>
            </li>`;
        }
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    if (currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
        //showing the time slot for active day,i.e. present day
        let todayEl = document.getElementsByClassName("active")[0];
        appointmentDay = todayEl.innerHTML;
        removePreviousTimeBox();
        todayEl.classList.add("active");
        let wNum = parseInt(calculateWeekNumber(todayEl));
        let slotId = `below-week-${wNum}`;
        document.getElementById(`${slotId}`).style.display = "grid";
        // doClickAction();
        const timeSelects = document.querySelectorAll(`.time`);
        for (let i = 0; i < timeSelects.length; i++) {
            timeSelects[i].addEventListener("click", () => {
                timeErrorMsg = document.getElementById("time-error");
                if (timeErrorMsg) {
                timeErrorMsg.remove();
                // timeErrorMsg=null;
                }
                removePreviousTimeBoxSelects();
                appointmentTime = timeSelects[i].innerHTML;
                timeSelects[i].style.backgroundColor = "#3587cd";
                timeSelects[i].classList.add("selected-time");
                timeSelects[i].style.color = "white";
            });
        }
    }
}

renderCalendar();

// Update the left angle color based on whether it's clickable or not
const updateLeftAngleColor = () => {
    if (currMonth <= new Date().getMonth() && currYear <= new Date().getFullYear()) {
        prevIcon.style.color = "#b1b1b3";  // Change the color to grey if trying to go to past month
    } else {
        prevIcon.style.color = "#3587cd";  // Change the color back to the original color
    }
};

prevIcon.addEventListener("click", () => {
    if (currMonth <= new Date().getMonth() && currYear <= new Date().getFullYear()) {
        return;  // Disable clicking on the left angle if trying to go to past month
    }

    currMonth = currMonth - 1;
    if (currMonth < 0) {
        currMonth = 11;
        currYear--;
    }

    renderCalendar();
    updateLeftAngleColor();
    doClickAction();
});

nextIcon.addEventListener("click", () => {
    currMonth = (currMonth + 1) % 12;
    if (currMonth === 0) {
        currYear++;
    }

    renderCalendar();
    updateLeftAngleColor();
    doClickAction();
});

// Initial color update
updateLeftAngleColor();



//removing the timeBoxes on clicking another day:
function removePreviousTimeBox() {
    let boxes = document.getElementsByClassName("time-slot");
    // console.log(boxes);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.display = "none";
    }
    //removing previous active day
    let days = document.querySelectorAll(".days li");
    for (let i = 0; i < days.length; i++) {
        if (days[i].classList.contains("active")) {
            days[i].classList.remove("active");
        }
    }
    removePreviousTimeBoxSelects();
}


//removing the timeBoxes on clicking another day:
function removePreviousTimeBoxSelects() {
    let selects = document.getElementsByClassName("time");
    for (let i = 0; i < selects.length; i++) {
        if (selects[i].classList.contains("selected-time")) {
            selects[i].classList.remove("selected-time");
        }
        selects[i].style.backgroundColor = "white";
        selects[i].style.color = "#3587cd";
    }
}

//function to calculate week number of clicked day:
function calculateWeekNumber(day) {
    // so day 1 -dayName can be get from this....
    let clickedDay = parseInt(day.innerHTML);
    let firstDay = parseInt(firstDayofMonth);//firstDayofMonth={0 for mo,1 for tu,2 for we ,........,6 for su}
    let sum = firstDay + clickedDay;
    let modNum = sum % 7;
    if (modNum == 0) {
        return sum / 7;
    }
    return sum / 7 + 1;
}

//adding action listener to days on click
function doClickAction() {
    //making day clickable
    const liDays = document.querySelectorAll(".days li");
    liDays.forEach(day => {
        if (day.classList.contains("past") || day.classList.contains("inactive") || day.classList.contains("time-slot")) {
        } else {
            day.addEventListener("click", () => {
                appointmentDay = day.innerHTML;
                removePreviousTimeBox();
                day.classList.add("active");
                let wNum = parseInt(calculateWeekNumber(day));
                let slotId = `below-week-${wNum}`;
                document.getElementById(`${slotId}`).style.display = "grid";
                // make time clickable now
                const timeSelects = document.querySelectorAll(`.time`);
                for (let i = 0; i < timeSelects.length; i++) {
                    timeSelects[i].addEventListener("click", () => {
                        timeErrorMsg = document.getElementById("time-error");
                        if (timeErrorMsg) {
                        timeErrorMsg.remove();
                        // timeErrorMsg=null;
                        }
                        removePreviousTimeBoxSelects();
                        appointmentTime = timeSelects[i].innerHTML;
                        timeSelects[i].style.backgroundColor = "#3587cd";
                        timeSelects[i].classList.add("selected-time");
                        timeSelects[i].style.color = "white";
                    });
                }
            });
        }
    });
}
//perform clickActions

doClickAction();
setInterval(() => {
    document.getElementById("hide-input").value = `${currYear}-${currMonth}-${appointmentDay}-${appointmentTime}`;
}, 10);