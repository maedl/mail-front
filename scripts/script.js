const main = document.querySelector('main');

function init() {
  renderForm();
}

function handleRegistration() {
  let userName = (document.querySelector('#name')).value;
  let userMail = (document.querySelector('#email')).value;

  if ( (userName.length > 0) && (userMail.length > 0) ) {
    registerUser(userName, userMail);
  }
  else {
    renderFailedRegistration();
  }
}

/***********************************
 * Render
 */

function renderForm() {
  main.innerHTML = '';
  main.innerHTML = `

  <form>
    <h3>Register to our newsletter!</h3>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name">
      <label for="email">Email:</label>
      <input type="mail" name="email" id="email">
      <button type="button">Register</button>
    </form>  
  `
  const registerBtn = document.querySelector('button');
  registerBtn.addEventListener('click', handleRegistration)
}

function renderFailedRegistration() {
  main.innerHTML = '';
  main.innerHTML = `
  <div>
    <h2>Could not register your e-mail</h2>
    <button type="button" id="back-btn">Go back</button>
  </div>
  `

  const backBtn = document.querySelector('#back-btn');
  backBtn.addEventListener('click', renderForm);

}

init();