import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
getFromStorage();

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.textarea.value === '' || refs.email.value === '') {
    return;
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getFromStorage() {
  const getFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (getFormData) {
    refs.textarea.value = getFormData.message;
    refs.email.value = getFormData.email;
  }
}
