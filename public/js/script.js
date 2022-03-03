// const { response } = require("express");

const form = document.querySelector("form");

const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");

form.addEventListener("submit", (e) => {
  const ip = document.querySelector("input");
  console.log(ip.value);
  if (ip.value === "") {
    alert("Enter THE Location");
    return;
  } else {
    msg1.innerText = "Loading...";
    msg2.innerText = "";

    fetch(`/weather?address=${ip.value}`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.error) msg1.innerText = `Wrong Location Entered`;
            else {
              msg1.innerText = data.location;
              msg2.innerText = data.forecast;
            }
          })
          .catch((error) => console.log(error, `something went wrong`));
      })
      .catch((error) => console.log(`something went wrong`));
  }

  e.preventDefault();
  ip.value = "";
});
