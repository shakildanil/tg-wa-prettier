const SESSION_KEY = 'app_initialized';

export function initializeAppStorage() {
  console.log('Clearing local storage');
  localStorage.clear(); // Очищаем localStorage
  console.log('Local storage cleared');
}

