const email = document.querySelector(".email");
const fullname = document.querySelector(".name");
const form = document.querySelector(".contactForm");
const button = document.querySelector(".form-btn");
const subject = document.querySelector(".subject");
const message = document.querySelector(".message");

// alert();

form.addEventListener("submit", (e) => {
  alert();
  e.preventDefault();
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("fullname", fullname.value);
  formData.append("subject", subject.value);
  formData.append("message", message.value);

  // Construct the fetch request
  fetch("software/api.php?name=contact_message", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
