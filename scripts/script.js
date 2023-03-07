const main = document.querySelector('main');

function init() {
  renderForm();
}

function handleRegistration() {
  let userName = (document.querySelector('#name')).value;
  let userMail = (document.querySelector('#email')).value;

  let validEmail = checkMail(userMail);

  if (!validEmail) {
    renderFailedRegistration('email');
    return;
  }

  if ( (userName.length > 0) && (validEmail) ) {
    registerUser(userName, userMail);
  }
  else {
    renderFailedRegistration('name');
  }
}

function checkMail(mail) {
  const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  let mailPattern = regexMail;
  let validEmail = mailPattern.test(mail);

  if (validEmail) {
    return true;
  }
  else return false;
}

/***********************************
 * Service
 */

function registerUser(user, mail) {
  let newUser = {
    name: user,
    email: mail
  }

  fetch('http://localhost:3000/users/add', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);

    if (data.status === 'success') {
      renderAddedMail(newUser.name, newUser.email);
    }
    else if (data.status === 'failed') {
      renderFailedRegistration(data.message);
    }
  })
  .catch((err) => {
    console.error(err);
  })
}

/***********************************
 * Render
 */

function renderAddedMail(name, mail) {
  main.innerHTML = '';
  main.innerHTML = `
  <div>
    <h3>Thank you ${name} for subscribing to our newsletter!</h3
    <p>We will send you an email shortly on ${mail}</p>
    <button type="button" id="back-btn">Go back</button>
  </div>
  `;
  const backBtn = document.querySelector('#back-btn');
  backBtn.addEventListener('click', renderForm);
}

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

function renderFailedRegistration(reason) {
  main.innerHTML = '';

  if (reason === 'name' || reason === 'email') {
    main.innerHTML = `
    <div>
      <h3>Could not register your e-mail, invalid ${reason} input.</h3>
      <button type="button" id="back-btn">Go back</button>
    </div>
    `
  }
  else if (reason === 'exists') {
    main.innerHTML = `
    <div>
      <h3>You are already registered!</h3>
      <button type="button" id="back-btn">Go back</button>
  </div>
  `
  }

  const backBtn = document.querySelector('#back-btn');
  backBtn.addEventListener('click', renderForm);

}

init();
