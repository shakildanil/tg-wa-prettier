// global.d.ts

interface TelegramWebAppUser {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
}

interface TelegramWebApp {
  initDataUnsafe: {
    user?: TelegramWebAppUser;
    auth_date?: string;
    hash?: string;
  };
  MainButton: TelegramWebAppMainButton;
  ready(): void;
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
