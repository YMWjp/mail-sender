document.getElementById("mailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  fetch("/send-mails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("status").innerText = data.status;
    });
});
