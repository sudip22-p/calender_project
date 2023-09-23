

const nameRegex = /^[A-Za-z\s]+$/; //Allow only letters and spaces
const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegex = /^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\)\s?)?[\d\s\-]+$/;

//for registration validation msg:
let fullName;
let nameError;

let email;
let emailError;

let phoneNum;
let phoneNumError;


let selectedTimes;
let timeError;


document
  .getElementById("submit")
  .addEventListener("click", (event) => {
    event.preventDefault();


    // Validation checks
    let isValid = true;


    //checking if name is valid or not
    fullName = document.getElementById("name").value;
  if (!fullName.match(nameRegex) || fullName.trim() == ""||fullName.trim().length<3){
      nameError = document.getElementById("name-error");
      if (!nameError) {
        let errorMsg = document.createElement("div");
        errorMsg.innerHTML = "*Please enter your full name!!";
        errorMsg.style.color = "#DC143C";
        errorMsg.style.fontSize = "12px";
        errorMsg.id = "name-error";
        document.getElementById("name").insertAdjacentElement("afterend", errorMsg);
      }
      isValid = false;
    }

  //Check if the email is valid
  email = document.getElementById("email").value;
  if (!email.match(emailRegex)) {
      emailError = document.getElementById("email-error");
      if (!emailError) {
        let errorMsg = document.createElement("div");
        errorMsg.innerHTML = "*Please enter a valid email address!";
        errorMsg.style.color = "#DC143C";
        errorMsg.style.fontSize = "12px";
        errorMsg.id = "email-error";
        document.getElementById("email").insertAdjacentElement("afterend", errorMsg);
      }
      isValid = false;
    }


  //Check if the phone number is valid
  phoneNum = document.getElementById("phone").value;
  if (!phoneRegex.test(phoneNum)) {
      phoneNumError = document.getElementById("phone-error");
      if (!phoneNumError) {
        let errorMsg = document.createElement("div");
        errorMsg.innerHTML = "*Please enter a valid phone number!";
        errorMsg.style.color = "#DC143C";
        errorMsg.style.fontSize = "12px";
        errorMsg.id = "phone-error";
        document.getElementById("phone").insertAdjacentElement("afterend", errorMsg);
      }
      isValid = false;
    }
    //check if time is selected or not!!
    selectedTimes=document.getElementsByClassName("selected-time");
    if(selectedTimes.length==0){
      timeError = document.getElementById("time-error");
      if (!timeError) {
        let errorMsg = document.createElement("div");
        errorMsg.innerHTML = "*Please select the date & time!!";
        errorMsg.style.color = "#DC143C";
        errorMsg.style.fontSize = "12px";
        errorMsg.style.marginTop = "12px";
        errorMsg.id = "time-error";
        document.getElementById("desc").insertAdjacentElement("afterend", errorMsg);
      }
      isValid = false;
    }
    if (isValid) {
      alert("Appointment successful!!------>");
      // window.location.href = "./index.html";
    }
  });
//fnc to remove error msg
function removeErrorMessage(input) {
  if (input.id === "name") {
    nameError = document.getElementById("name-error");
    if (nameError) {
      nameError.remove();
      // nameError=null;
    }
  }
  if (input.id === "email") {
    emailError = document.getElementById("email-error");
    if (emailError) {
      emailError.remove();
      // emailError=null;
    }
  }
  if (input.id === "phone") {
    phoneNumError = document.getElementById("phone-error");
    if (phoneNumError) {
      phoneNumError.remove();
      // phoneNumError=null;
    }
  }
}
//above fnc suppport:::fnc
let inputs = document.getElementsByTagName("input");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", () => {
    removeErrorMessage(inputs[i]);
  });
}