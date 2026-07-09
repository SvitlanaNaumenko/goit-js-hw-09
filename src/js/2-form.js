// 1. Оголошуємо об'єкт formData поза функціями
const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// 3. При завантаженні сторінки перевіряємо наявність даних у локальному сховищі
populateForm();

// 2. Використовуємо делегування для відстеження змін у формі через подію input
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  // Записуємо значення в об'єкт formData, прибираючи пробіли по краях (.trim())
  formData[event.target.name] = event.target.value.trim();

  // Зберігаємо оновлений об'єкт formData у локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      // Оновлюємо наш робочий об'єкт formData збереженими значеннями
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      // Підставляємо значення в поля форми
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing saved data from localStorage', error);
    }
  }
}

// 4. Обробка відправки форми (подія submit)
function onFormSubmit(event) {
  event.preventDefault();

  // Перевірка, чи обидва поля заповнені
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return; // Перериваємо виконання, якщо хоч одне поле порожнє
  }

  // Якщо всі поля заповнені:
  // Виводимо об'єкт formData з актуальними значеннями у консоль
  console.log('Submitted Data:', formData);

  // Очищаємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Скидаємо значення в робочому об'єкті
  formData.email = '';
  formData.message = '';

  // Очищаємо поля форми
  form.reset();
}
