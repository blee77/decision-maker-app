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

$("#create-poll").submit(function(event) {
  event.preventDefault();

    const data = $(this).serialize();
    console.log("this is giving the const data", data);

    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      title: $("#poll-title").val(),
      choiceTitle1: $("#first-choice").val(),
      choiceDescription1: $("#mc1-description").val(),
      choiceTitle2: $("#second-choice").val(),
      choiceDescription2: $("#mc2-description").val(),
      choiceTitle3: $("#third-choice").val(),
      choiceDescription3: $("#mc3-description").val(),
    };

    console.log("this is giving the form data", formData);

    $.ajax({
      type: "POST",
      url: "/users/createpoll",
      data: formData,
      success: function (response)  {
        document.location.href=`/poll/${response.poll_id}/sharepoll`;
      }
    })
    // .done((response) => {
    //   console.log("the response",response);
    //   //
    // })
    // .fail((error) => {
    //   console.log("error", error)
    // });
  });

  // function createPoll(userId) {
  //   const formData = {
  //     title: $("#poll-title").val(),
  //     admin_link: generateAdminLink(),
  //     submission_link: generateSubmissionLink(),
  //     user_id: userId
  //   };

  //   $.ajax({
  //     type: "POST",
  //     url: "/users/createpoll",
  //     data: formData,
  //   }).then((poll) => {
  //     console.log("Poll generated with id:", poll.id);
  //   }).catch((error) => {
  //     console.log("Error generating poll:", error);
  // //   });

  // };
