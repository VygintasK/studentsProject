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
]
let = localStorageStudentsData = []
//----- TESTAVIMUI atkomentavus sudeda i local nauja masyva esanti auksciau
// localStorage.setItem('localStorageStudentData',JSON.stringify(initialData))










function renderStudOrEmptyArrFromLocal(){
  localStorageStudentsData = JSON.parse(localStorage.getItem('localStorageStudentData'))
  if (localStorageStudentsData){
    localStorageStudentsData.map(student => {
      renderSingleStudent(student);
    })
  } else {
    localStorageStudentsData = []
    localStorage.setItem('localStorageStudentData',JSON.stringify(localStorageStudentsData))
  }
}
function createStudentFromForm(){
  let studentForm = document.querySelector('#student-form');
  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isThisForm = true
    // --------cia inputai is browserio
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
    let interestsArr = []
    interests.forEach(interest => {
      interestsArr.push(interest.value)
    });
  
    // ---- VALIDATION -----
    if ((isThisForm) && (!validationStudent(event))) {
    let errorMessage = 'Some fields are missing...';
    renderAlertMessage(errorMessage, 'color-red');
    return;
    }
  
    // --------cia sukuria studento objekta
    let newStudentOjb = {
      name,
      surname,
      age,
      phone,
      email,
      itKnowledge,
      group: group,
      interests: interestsArr,
    }
    
    //------cia atidaro LOCAL ir ikelia newStudent I LOCAL
    let newLocalStorageStudentsData = JSON.parse(localStorage.getItem('localStorageStudentData'))
    newLocalStorageStudentsData.push(newStudentOjb)
    localStorage.setItem('localStorageStudentData',JSON.stringify(newLocalStorageStudentsData))
  
   
  
    renderSingleStudent(newStudentOjb)
  
    //------ nuresetina forma
    event.target.reset(); 
    //------cia istrina imputus saugomus LOCAL
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('age');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('it-knowledge');
    localStorage.removeItem('group');
    localStorage.removeItem('interest');
  });
  
}
function formDataInLocalStorage() {
  let localName = localStorage.getItem('name');
  let localSurname = localStorage.getItem('surname');
  let localAge = localStorage.getItem('age');
  let localPhone = localStorage.getItem('phone');
  let localEmail = localStorage.getItem('email');
  let localItKnowledge = localStorage.getItem('it-knowledge');
  let localGroup = localStorage.getItem('group');
  let localInterests = JSON.parse(localStorage.getItem('interest'));

  
  let nameInput = document.querySelector('#student-name')
  let surnameInput = document.querySelector('#student-surname')
  let ageInput = document.querySelector('#student-age')
  let phoneInput = document.querySelector('#student-phone')
  let emailInput = document.querySelector('#student-email')
  let itKnowledgeInput = document.querySelector('#student-it-knowledge')
  let groupInputAll = document.querySelectorAll('[name="group"]')


  // --- Varda is storage ideda i forma

  if (localName){
    nameInput.value = localName;
  }
  if (localSurname){
    surnameInput.value = localSurname;
  }
  if (localAge){
    ageInput.value = localAge;
  }
  if (localAge){
    ageInput.value = localAge;
  }
  if (localPhone){
    phoneInput.value = localPhone;
  }
  if (localEmail){
    emailInput.value = localEmail;
  }
  if (localItKnowledge){
    itKnowledgeInput.value = localItKnowledge;
  }


  if (groupInputAll) {
    groupInputAll.forEach(groupInput =>{
      if (groupInput.value === localGroup) {
        groupInput.checked = true
      }
    })
  }
  if (localInterests) {
    localInterests.map(interestValue => {
      let interestElement = document.querySelector(`[value="${interestValue}"]`);
      if (interestElement) {
        interestElement.checked = true;
      }
    });
  }

  // --- iesko kas suveike ir ideda i local
  let studentForm = document.querySelector('#student-form')
  studentForm.addEventListener('input', (event) => {
    let activeInput = event.target;
    let inputName = activeInput.name;
    let inputValue = activeInput.value;
    console.log(inputName)
    localStorage.setItem(inputName, inputValue);
    let formInterests = document.querySelectorAll('[name="interest"]:checked');
    let interestValues = [];
    formInterests.forEach(interest => {
      interestValues.push(interest.value);
    });
    localStorage.setItem('interest', JSON.stringify(interestValues));
  })
  changeRangeOutput();
}
function renderSingleStudent(StudObj) {
  let studentsList = document.querySelector('#students-list');
  let name = StudObj.name;
  let surname = StudObj.surname;
  let age = StudObj.age;
  let phone = StudObj.phone;
  let email = StudObj.email;
  let itKnowledge = StudObj.itKnowledge;
  let group = StudObj.group;
  let interests = StudObj.interests
  /////////////////////////////////
  let studentForm = document.querySelector('#student-form');
  let inputErrorMessages = studentForm.querySelectorAll('.input-error-message');
  inputErrorMessages.forEach(message => message.remove());

  ////--------------Create student item---- spenius ir visokius sudus
  let studentItem = document.createElement('div');
  let nameElement = document.createElement('p');
  let surnameElement = document.createElement('p');
  let ageElement = document.createElement('p');
  let emailElement = document.createElement('p');
  let phoneElement = document.createElement('p');
  let itKnowledgeElement = document.createElement('p');
  let groupElement = document.createElement('p');
  let interestWrapperElement = document.createElement('div');
  let interestTitleElement = document.createElement('h3');
  let interestListElement = document.createElement('ul');
  interests.forEach(interest => {
    let interestItem = document.createElement('li');
    interestItem.textContent = interest;
    interestListElement.append(interestItem);
  });

  studentItem.classList.add('student-item');
  nameElement.innerHTML = `<strong>Name:</strong> <span class="nameSpenius">${name}</span>`;
  surnameElement.innerHTML = `<strong>Surname:</strong> <span class="surnameSpenius">${surname}</span>`;
  ageElement.innerHTML = `<strong>Age:</strong> <span class="ageSpenius">${age}</span>`;
  emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">****</span>`;
  phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">****</span>`;
  itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> <span class="ITKnowledgeSpenius">${itKnowledge}</span>`;
  groupElement.innerHTML = `<strong>Group:</strong> <span class="groupSpenius">${group}</span>`;
  interestWrapperElement.classList.add('interest-wrapper');
  interestTitleElement.textContent = 'Interests:';
 
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
function validationStudent(event){
  let formIsValid = true;
  let requiredInputs = event.target.querySelectorAll('.required');
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
  // console.log(formIsValid)
  return formIsValid
}
function changeRangeOutput() {
  let itKnowledgeInput = document.querySelector('#student-it-knowledge');
  let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
  itKnowledgeInput.addEventListener('input', () => {
    itKnowledgeOutput.textContent = itKnowledgeInput.value;
  });
}
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
function filterStudents(){
  let searchForm = document.querySelector('#search-form')
let searchName = document.querySelector('#nameSearch')
searchForm.addEventListener("submit", (eventSubmit) => {
  eventSubmit.preventDefault();
  let selection = document.querySelector('#studFilter').value
  let searchInput = eventSubmit.target.nameSearch.value.toLowerCase()
  let allStudentsItems = document.querySelectorAll('.student-item')
    allStudentsItems.forEach(element =>{
      let getName = element.querySelector('.nameSpenius').textContent.toLowerCase()  
      let getSurname = element.querySelector('.surnameSpenius').textContent.toLowerCase()
      let getITKnowledge = element.querySelector('.ITKnowledgeSpenius').textContent.toLowerCase()
      let getAge = element.querySelector('.ageSpenius').textContent.toLowerCase()
      let getGroup = element.querySelector('.groupSpenius').textContent.toLowerCase()
      if ((selection === 'name') && (getName.includes(searchInput))){
        element.style.display = 'block'
      } else if ((selection === 'surname') && (getSurname.includes(searchInput))){
        element.style.display = 'block'
      } else if ((selection === 'age') && (getAge === searchInput)){
        element.style.display = 'block'
      } else if ((selection === 'ITKnowledge') && (getITKnowledge === searchInput)){
        element.style.display = 'block'
      } else if ((selection === 'group') && (getGroup.includes(searchInput))){
        element.style.display = 'block'
      } else {
        element.style.display = 'none'
      }
  })
})
}
function init(){
  renderStudOrEmptyArrFromLocal()
  
  createStudentFromForm()
  
  formDataInLocalStorage();
  
  filterStudents()
}
init()