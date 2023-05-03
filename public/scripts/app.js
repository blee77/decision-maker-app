// Client facing scripts here

//Talk to team memebrs to dynamically
// add choices to the polls page.
// When you submit the form for the poll

//1) Create the poll record
//2) Use id of the poll to dynamically add choices for the poll
//3) You can now send the generated link to the users.


const createChoiceElement = function() {
  return ` <div>
  <input type="text" name="choices[title][]" placeholder="Enter your name" >
</div>`;

};

$('#add-choice-btn').click(()=>{
  const choice = createChoiceElement();
  $('#choices').append(choice);
});
