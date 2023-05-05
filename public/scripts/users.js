// Client facing scripts here
// $(() => {
//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//       .done((response) => {
//         const $usersList = $('#users');
//         $usersList.empty();

//         for (const user of response.users) {
//           $(`<li class="user">`).text(user.name).appendTo($usersList);
//         }
//       });
//   });
// });

function generateRandomString() {
  let characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let stringLength = 6;

  let randomString = "";

  for (let i = 0; i < stringLength; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    randomString += characters[randomNumber];
  }
  return randomString;
}

function generateAdminLink() {
  let uniqueID = generateRandomString();
  let finalURL = "/results/" + uniqueID;
  return finalURL;
}

function generateSubmissionLink() {
  let uniqueID = generateRandomString();
  let finalURL = "/vote/" + uniqueID;
  return finalURL;
}

$("#create-poll").submit(function(event) {
  event.preventDefault();

    const data = $(this).serialize();
    console.log("this is giving the const data", data);

    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      title: $("#poll-title").val(),
    };

    console.log("this is giving the form data", formData);

    $.ajax({
      type: "POST",
      url: "/users/createpoll",
      data: formData,
    }).then((user) => {
      console.log("user", user);
      console.log("User generated with id", user.id);
      // createPoll(user.id);
    }).catch((error) => {
      console.log("Error generating user:", error);
    });
  });

  function createPoll(userId) {
    const formData = {
      title: $("#poll-title").val(),
      admin_link: generateAdminLink(),
      submission_link: generateSubmissionLink(),
      user_id: userId
    };

    $.ajax({
      type: "POST",
      url: "/users/createpoll",
      data: formData,
    }).then((poll) => {
      console.log("Poll generated with id:", poll.id);
    }).catch((error) => {
      console.log("Error generating poll:", error);
    });

  };
