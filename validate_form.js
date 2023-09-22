
//for registration validation msg:
let fullName;
let nameError;

let phoneNum;
let phoneNumError;


document
  .getElementById("submit")
  .addEventListener("click", (event) => {
    event.preventDefault();


    // Validation checks
    let isValid = true;

    fullName = document.getElementById("name").value;
    if (fullName.trim() === "") {
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
    if (isValid) {
      alert("Appointment successful!!------>");
      // window.location.href = "./index.html";
    }
  });