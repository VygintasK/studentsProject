let initialData = [
  {
    name: 'Kyle',
    surname: 'Doe',
    age: 30,
    phone: 4565464645,
    email: 'name@surname.com',
    itKnowledge: 8,
    group: 'feu 5',
    interests: ['JavaScript', 'PHP'],
  },
  {
    name: 'Tom',
    surname: 'Tomy',
    age: 54,
    phone: 87964631321,
    email: 'name2@surname.com',
    itKnowledge: 4,
    group: 'feu 3',
    interests: [],
  },
  {
    name: 'Kate',
    surname: 'Moss',
    age: 45,
    phone: 87964631321,
    email: 'name2@surname.com',
    itKnowledge: 10,
    group: 'feu 1',
    interests: ['C++', 'PHP'],
  },
  {
    name: 'Zoe',
    surname: 'Lambert',
    age: 18,
    phone: 87964631321,
    email: 'name2@surname.com',
    itKnowledge: 1,
    group: 'feu 4',
    interests: ['PHP', 'Node.js', 'JavaScript'],
  },
  {
    name: 'Rod',
    surname: 'Clucher',
    age: 45,
    phone: 87964631321,
    email: 'name2@surname.com',
    itKnowledge: 7,
    group: 'feu 2',
    interests: ['PHP'],
  },
];

let = localStorageStudentsData = []

localStorageStudentsData = JSON.parse(localStorage.getItem('localStorageStudentData'))

let studentForm = document.querySelector('#student-form');
let studentsList = document.querySelector('#students-list');

if (localStorageStudentsData){
  localStorageStudentsData.map(student => {
    renderSingleStudent(student);
  })
}
function renderSingleStudent(data) {
  let name = data.name;
  let surname = data.surname;
  let age = data.age;
  let phone = data.phone;
  let email = data.email;
  let itKnowledge = data.itKnowledge;
  let group = data.group;
  let interests = data.interests
  let inputErrorMessages = studentForm.querySelectorAll('.input-error-message');
  inputErrorMessages.forEach(message => message.remove());
  let requiredInputs = studentForm.querySelectorAll('.required');
  let formIsValid = true;
  requiredInputs.forEach(input => {
    input.classList.remove('input-error');
    if (!input.value) {
      formIsValid = false;
      checkInputData(input, 'This field is required.');
    } else if (input.name === 'name') {
      if (input.value.length < 3) {
        formIsValid = false;
        let errorText = 'Name is too short. At least 3 symbols is required.'
        checkInputData(input, errorText);
      }
    } else if (input.name === 'surname') {
      if (input.value.length < 3) {
        formIsValid = false;
        checkInputData(input, 'Surname is too short. At least 3 symbols is required.');
      }
    } else if (input.name === 'phone') {
      if (input.value.length < 9 || input.value.length > 12) {
        formIsValid = false;
        checkInputData(input, 'Phone number is invalid.');
      }
    } else if (input.name === 'age') {
      if (input.value < 0) {
        formIsValid = false;
        checkInputData(input, 'Age cannot be a negative number.');
      } else if (input.value > 120) {
        formIsValid = false;
        checkInputData(input, 'Age cannot be more then 120 years.');
      }
    } else if (input.name === 'email') {
      if (input.value.length < 9 || !input.value.includes('@') || !input.value.includes('.')) {
        formIsValid = false;
        checkInputData(input, 'Email is incorrect.');
      }
    }
  });
  if (!formIsValid) {
    let errorMessage = 'Some fields are missing...';
    renderAlertMessage(errorMessage, 'color-red');
    return;
  }
  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');
  let nameElement = document.createElement('p');
  nameElement.innerHTML = `<strong>Name:</strong> <span class="nameSpenius">${name}</span>`;
  let surnameElement = document.createElement('p');

  surnameElement.innerHTML = `<strong>Surname:</strong> <span class="surnameSpenius">${surname}</span>`;
  let ageElement = document.createElement('p');
  ageElement.innerHTML = `<strong>Age:</strong> <span class="ageSpenius">${age}</span>`;
  let emailElement = document.createElement('p');
  emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">****</span>`;
  let phoneElement = document.createElement('p');
  phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">****</span>`;
  let itKnowledgeElement = document.createElement('p');
  itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> <span class="ITKnowledgeSpenius">${itKnowledge}</span>`;
  let groupElement = document.createElement('p');
  groupElement.innerHTML = `<strong>Group:</strong> <span class="groupSpenius">${group}</span>`;
  let interestWrapperElement = document.createElement('div');
  interestWrapperElement.classList.add('interest-wrapper');
  let interestTitleElement = document.createElement('h3');
  interestTitleElement.textContent = 'Interests:';
  let interestListElement = document.createElement('ul');

  interests.forEach(interest => {

    let interestItem = document.createElement('li');
    interestItem.textContent = interest;

    interestListElement.append(interestItem);
  });
 

  interestWrapperElement.append(interestTitleElement, interestListElement);
  let privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = 'Show personal info';
  privateInfoButton.classList.add('private-info-button', 'show');
  let dataHidden = true;
  privateInfoButton.addEventListener('click', () => {
    let privateEmail = emailElement.querySelector('.hidden-area');
    let privatePhone = phoneElement.querySelector('.hidden-area');
    if (dataHidden) {
      privateEmail.textContent = email;
      privatePhone.textContent = phone;
      privateInfoButton.textContent = 'Hide personal info';
    } else {
      privateEmail.textContent = '****';
      privatePhone.textContent = '****';
      privateInfoButton.textContent = 'Show personal info';
    }
    dataHidden = !dataHidden;
  });
  let removeStudentButton = document.createElement('button');
  removeStudentButton.textContent = 'Remove student';
  removeStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let removedStudentText = `Student (${name} ${surname}) successfully removed.`;
    renderAlertMessage(removedStudentText);
  });
  studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, removeStudentButton);
  studentsList.prepend(studentItem);
  let createdStudentText = `Student created (${name} ${surname})`;
  renderAlertMessage(createdStudentText);
}

function changeRangeOutput() {
  let itKnowledgeInput = document.querySelector('#student-it-knowledge');
  let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
  itKnowledgeInput.addEventListener('input', () => {
    itKnowledgeOutput.textContent = itKnowledgeInput.value;
  });
}
changeRangeOutput();
studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let elements = event.target.elements;
  let name = elements.name.value;
  let surname = elements.surname.value;
  let age = elements.age.value;
  let phone = elements.phone.value;
  let email = elements.email.value;
  let itKnowledge = elements['it-knowledge'].value;
  let group = elements.group.value;
  let interests = document.querySelectorAll('[name="interest"]:checked');
  let inputErrorMessages = event.target.querySelectorAll('.input-error-message');
  inputErrorMessages.forEach(message => message.remove());
  let requiredInputs = event.target.querySelectorAll('.required');
  let formIsValid = true;
  requiredInputs.forEach(input => {
    input.classList.remove('input-error');
    if (!input.value) {
      formIsValid = false;
      checkInputData(input, 'This field is required.');
    } else if (input.name === 'name') {
      if (input.value.length < 3) {
        formIsValid = false;
        let errorText = 'Name is too short. At least 3 symbols is required.'
        checkInputData(input, errorText);
      }
    } else if (input.name === 'surname') {
      if (input.value.length < 3) {
        formIsValid = false;
        checkInputData(input, 'Surname is too short. At least 3 symbols is required.');
      }
    } else if (input.name === 'phone') {
      if (input.value.length < 9 || input.value.length > 12) {
        formIsValid = false;
        checkInputData(input, 'Phone number is invalid.');
      }
    } else if (input.name === 'age') {
      if (input.value < 0) {
        formIsValid = false;
        checkInputData(input, 'Age cannot be a negative number.');
      } else if (input.value > 120) {
        formIsValid = false;
        checkInputData(input, 'Age cannot be more then 120 years.');
      }
    } else if (input.name === 'email') {
      if (input.value.length < 9 || !input.value.includes('@') || !input.value.includes('.')) {
        formIsValid = false;
        checkInputData(input, 'Email is incorrect.');
      }
    }
  });
  if (!formIsValid) {
    let errorMessage = 'Some fields are missing...';
    renderAlertMessage(errorMessage, 'color-red');
    return;
  }
  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');
  let nameElement = document.createElement('p');
  nameElement.innerHTML = `<strong>Name:</strong> <span class="nameSpenius">${name}</span>`;
  let surnameElement = document.createElement('p');
  surnameElement.innerHTML = `<strong>Surname:</strong> <span class="surnameSpenius">${surname}</span>`;
  let ageElement = document.createElement('p');
  ageElement.innerHTML = `<strong>Age:</strong> <span class="ageSpenius">${age}</span>`;
  let emailElement = document.createElement('p');
  emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">****</span>`;
  let phoneElement = document.createElement('p');
  phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">****</span>`;
  let itKnowledgeElement = document.createElement('p');
  itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> <span class="ITKnowledgeSpenius">${itKnowledge}</span>`;
  let groupElement = document.createElement('p');
  groupElement.innerHTML = `<strong>Group:</strong> <span class="groupSpenius">${group}</span>`;
  let interestWrapperElement = document.createElement('div');
  interestWrapperElement.classList.add('interest-wrapper');
  let interestTitleElement = document.createElement('h3');
  interestTitleElement.textContent = 'Interests:';
  let interestListElement = document.createElement('ul');

  let interestsArr = []
  interests.forEach(interest => {
    let interestItem = document.createElement('li');
    interestItem.textContent = interest.value;
    interestListElement.append(interestItem);
    interestsArr.push(interest.value)
  });
  interestWrapperElement.append(interestTitleElement, interestListElement);
  let privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = 'Show personal info';
  privateInfoButton.classList.add('private-info-button', 'show');
  let dataHidden = true;
  privateInfoButton.addEventListener('click', () => {
    let privateEmail = emailElement.querySelector('.hidden-area');
    let privatePhone = phoneElement.querySelector('.hidden-area');
    if (dataHidden) {
      privateEmail.textContent = email;
      privatePhone.textContent = phone;
      privateInfoButton.textContent = 'Hide personal info';
    } else {
      privateEmail.textContent = '****';
      privatePhone.textContent = '****';
      privateInfoButton.textContent = 'Show personal info';
    }
    dataHidden = !dataHidden;
  });
  let removeStudentButton = document.createElement('button');
  removeStudentButton.textContent = 'Remove student';
  removeStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let removedStudentText = `Student (${name} ${surname}) successfully removed.`;
    renderAlertMessage(removedStudentText);
  });
  studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, removeStudentButton);
  studentsList.prepend(studentItem);
  let createdStudentText = `Student created (${name} ${surname})`;
  renderAlertMessage(createdStudentText);
  event.target.reset(); 

  let newLocalStorageStudentsData = JSON.parse(localStorage.getItem('localStorageStudentData'))
  let newStudent = {
    name: name,
    surname: surname,
    age: age,
    phone: phone,
    email: email,
    itKnowledge: itKnowledge,
    group: group,
    interests: interestsArr,
  }
  newLocalStorageStudentsData.push(newStudent)
  localStorage.setItem('localStorageStudentData',JSON.stringify(newLocalStorageStudentsData))

  localStorage.removeItem('name');
  localStorage.removeItem('surname');
  localStorage.removeItem('age');
  localStorage.removeItem('phone');
  localStorage.removeItem('email');
  localStorage.removeItem('it-knowledge');
  localStorage.removeItem('group');
  localStorage.removeItem('interest');
});

function renderAlertMessage(text, elementClass) {
  let alertMessage = document.querySelector('#alert-message');
  alertMessage.textContent = text;
  if (elementClass) {
    alertMessage.classList.add(elementClass);
  }
  setTimeout(() => {
    alertMessage.textContent = '';
    alertMessage.classList.remove(elementClass);
  }, 5000);
}
function checkInputData(input, text) {
  let inputErrorMessage = document.createElement('span');
  inputErrorMessage.classList.add('input-error-message', 'color-red');
  input.classList.add('input-error');
  input.after(inputErrorMessage);
  inputErrorMessage.textContent = text;
}
let nameInput = document.getElementById('student-name');
let surnameInput = document.getElementById('student-surname');
let ageInput = document.getElementById('student-age');
let phoneInput = document.getElementById('student-phone');
let emailInput = document.getElementById('student-email');
let itKnowledgeInput = document.getElementById('student-it-knowledge');
let groupInputs = document.querySelectorAll('[name="group"]');
let interestInputs = document.querySelectorAll('[name="interest"]');
function formDataInLocalStorage(form) {
  let localName = localStorage.getItem('name');
  let localSurname = localStorage.getItem('surname');
  let localAge = localStorage.getItem('age');
  let localPhone = localStorage.getItem('phone');
  let localEmail = localStorage.getItem('email');
  let localItKnowledge = localStorage.getItem('it-knowledge');
  let localGroup = localStorage.getItem('group');
  let localInterests = JSON.parse(localStorage.getItem('interest'));
  let nameInput = form.elements.name;
  console.log(nameInput)
  console.log(localName)

  if (localName)
    {console.log(localName === null)
    let surnameInput = form.elements.surname;
    let ageInput = form.elements.age;
    let phoneInput = form.elements.phone;
    let emailInput = form.elements.email;
    let itKnowledgeInput = form.elements['it-knowledge'];
    let groupInput = form.elements.group;
    nameInput.value = localName;
    surnameInput.value = localSurname;
    ageInput.value = localAge;
    phoneInput.value = localPhone;
    emailInput.value = localEmail;
    itKnowledgeInput.value = localItKnowledge;
    groupInput.value = localGroup;
    if (localInterests) {
      localInterests.map(interestValue => {
        let interestElement = document.querySelector(`[value="${interestValue}"]`);
        if (interestElement) {
          interestElement.checked = true;
        }
      });
    }
  }
  form.addEventListener('input', (event) => {
    let activeInput = event.target;
    let inputName = activeInput.name;
    let inputValue = activeInput.value;
    localStorage.setItem(inputName, inputValue);
    let formInterests = document.querySelectorAll('[name="interest"]:checked');
    let interestValues = [];
    formInterests.forEach(interest => {
      interestValues.push(interest.value);
    });
    localStorage.setItem('interest', JSON.stringify(interestValues));
  })
}
formDataInLocalStorage(studentForm);

let searchForm = document.querySelector('#search-form')
let searchName = document.querySelector('#nameSearch')

searchForm.addEventListener("submit", (eventSubmit) => {
  console.clear()
  eventSubmit.preventDefault();
  let selection = document.querySelector('#studFilter').value
  console.log('Selected:',selection)
  let searchInput = eventSubmit.target.nameSearch.value.toLowerCase()
  let allStudentsItems = document.querySelectorAll('.student-item')
  console.log('Searching:',searchInput)
    allStudentsItems.forEach(element =>{
      let getName = element.querySelector('.nameSpenius').textContent.toLowerCase()  
      let getSurname = element.querySelector('.surnameSpenius').textContent.toLowerCase()
      let getITKnowledge = element.querySelector('.ITKnowledgeSpenius').textContent.toLowerCase()
      let getAge = element.querySelector('.ageSpenius').textContent.toLowerCase()
      let getGroup = element.querySelector('.groupSpenius').textContent.toLowerCase()
console.log(getAge)
      if ((selection === 'name') && (getName.includes(searchInput))){
        element.style.display = 'block'
      } else if ((selection === 'surname') && (getSurname.includes(searchInput))){
        element.style.display = 'block'
      } else if ((selection === 'age') && (getAge === searchInput)){
        element.style.display = 'block'
      } else if ((selection === 'ITKnowledge') && (getITKnowledge === searchInput)){
        element.style.display = 'block'
      } else if ((selection === 'group') && (getGroup.includes(searchInput))){
        console.log(selection === 'group')
        console.log(searchInput)
        console.log(getGroup)
        
        element.style.display = 'block'
      } else {
        element.style.display = 'none'
      }
  })
})