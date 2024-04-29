const email = document.querySelector(".form-email");
const fullname = document.querySelector(".form-fullname");
const form = document.querySelector(".contactForm");
const button = document.querySelector(".form-btn");
const subject = document.querySelector(".form-message");
const message = document.querySelector(".form-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("name", fullname.value);
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
      Swal.fire({
        icon: "success",
        title: data.data,
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "An Error Occur, Kindly Refresh and try again",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("There was a problem with the fetch operation:", error);
    });
});
