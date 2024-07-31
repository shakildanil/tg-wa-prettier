const SESSION_KEY = 'app_initialized';

export function initializeAppStorage() {
  if (!localStorage.getItem(SESSION_KEY)) {
    localStorage.clear(); // Очищаем localStorage
    localStorage.setItem(SESSION_KEY, 'true'); // Устанавливаем флаг инициализации
    console.log('Local storage cleared and session initialized');
  }
}
