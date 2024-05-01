let address = document.querySelector(".address");
let phone = document.querySelector(".phone");
let email = document.querySelector(".email-address");

let address_;
let phone_;
let email_;
window.addEventListener("load", async () => {
  const response = await fetch("software/api.php?name=contact");
  const data = await response.json();
  address_ = data.data[0].address;
  phone_ = data.data[0].phone;
  email_ = data.data[0].email;
});
address.innerHTML = address_;
phone.innerHTML = phone_;
email.innerHTML = email_;