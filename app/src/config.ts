import { defineConfig } from '@tok/generation';
import axios from 'axios';

const tg = window.Telegram.WebApp;

// Инициализация данных пользователя
const user = tg.initDataUnsafe?.user;

let userData = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  languageCode: ''
};

if (user) {
  userData = {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name || '',  // Значение по умолчанию
    username: user.username || '',    // Значение по умолчанию
    languageCode: user.language_code
  };
}

const SERVER_URL = 'https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com';

async function authenticate() {
  try {
    const response = await axios.get(`${SERVER_URL}/auth`, { withCredentials: true });
    return response.status === 200 ? 'success' : 'error';
  } catch (error) {
    console.error('Error during authentication:', error);
    return 'error';
  }
}

// Определение функции для обработки клика по кнопке
async function handleAuthClick() {
  const result = await authenticate();
  if (result === 'success') {
    setTimeout(() => {
      window.location.href = '#/paywall';
    }, 1000);
  } else {
    alert('Error during authentication'); // Временное решение: показать сообщение об ошибке
  }
}


export default defineConfig({
  // If you want to add language/currency localization – see ./examples/meditation as reference

  pages: [
    {
      slides: [
        // intro
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_hello.tgs'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',
          title: `Hello, ${userData.firstName}!`,
          description: `
            Create stunning onboarding and paywall for your Telegram Bot using the full power of Mini Apps.<br><br>
            It's <b>simple</b>, <b>fast</b>, highly <b>customizable</b> and <a href='https://github.com/Easterok/telegram-onboarding-kit' target='_blank'>open-source</a>!<br>
            <br>Your username: ${userData.username}
            <br>Your ID: ${userData.id}
            <br>Your language code: ${userData.languageCode}
          `,
          button: {
            content: 'Auth',
            href: 'https://google.com'
            // click: handleAuthClick
          },
        },

        // form
        // {
        //   extends: 'form', // note, it's important to extend from 'form' here
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_spy.tgs'),
        //     size: 150,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   title: 'Forms',
        //   description: 'SHIT',
        //   form: [
        //     {
        //       id: 'text_from_form',
        //       placeholder: 'Text input',
        //       type: 'text',
        //     },
        //     {
        //       id: 'number_from_form',
        //       placeholder: 'Number input',
        //       type: 'number',
        //     },
        //     {
        //       id: 'checkbox_from_form',
        //       placeholder: 'Checkbox',
        //       type: 'checkbox',
        //     },
        //   ],
        //   button: 'Next',
        // },

        // // list
        // {
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_juggling.tgs'),
        //     size: 150,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   title: 'Lists',
        //   description:
        //     'Lists can be used to showcase <b>features</b> of your product. Items support customizable icons',
        //   list: [
        //     {
        //       media: {
        //         type: 'icon',
        //         src: import('./assets/icons/guide.svg'),
        //         size: 30,
        //       },
        //       text: 'Some cool feature',
        //     },
        //     {
        //       media: {
        //         type: 'icon',
        //         src: import('./assets/icons/track.svg'),
        //         size: 30,
        //       },
        //       text: 'Some very cool feature',
        //     },
        //     {
        //       media: {
        //         type: 'icon',
        //         src: import('./assets/icons/time.svg'),
        //         size: 30,
        //       },
        //       text: 'Some extremely cool feature',
        //     },
        //   ],
        //   button: {
        //     content: 'Go to paywall',
        //     to: '/paywall'
        //   },
        // },
      ],
    },

    // paywall
    {
      extends: 'paywall',
      path: '/paywall',
      media: {
        type: 'sticker',
        src: import('./assets/stickers/duck_money.tgs'),
        size: 150,
      },
      shape: 'square',
      title: 'Your beautiful Paywall',
      list: [
        'Adjustable product cards',
        '<b>👛 Wallet Pay</b> and <b>Telegram Payments</b> ready. Add custom methods easily',
        'Subscriptions or One-time payments',
      ],
      products: [
        {
          id: '1_month_subscription',
          title: '1 month subscription',
          description: '2$/month',
          discount: '',
          price: 2,
        },
        {
          id: '1_year_subscription',
          title: '1 year subscription',
          description: '6$/month',
          discount: 'Discount 50%',
          price: 12,
        },
      ],
      mainButtonText: 'Buy for {price}',
      popup: {
        // popup for payment methods choice
        type: 'web',
      },
      links: [
        {
          text: 'Privacy policy',
          href: 'https://google.com',
        },
        {
          text: 'Terms of use',
          href: 'https://google.com',
        },
      ],
    },
  ],
});
