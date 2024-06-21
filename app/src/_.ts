interface TelegramWebAppUser {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
}

interface TelegramAuthData extends TelegramWebAppUser {
  auth_date: string;
  hash: string;
}

interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
  auth_date?: string;
  hash?: string;
}

interface TelegramWebApp {
  initDataUnsafe: TelegramWebAppInitData;
  MainButton: TelegramWebAppMainButton;
  ready(): void;
  onAuth?: (callback: (authData: TelegramAuthData) => void) => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}

interface TelegramWebAppMainButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(callback: () => void): void;
  offClick(): void;
}
