/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
/* -------------------------------------------------------------------------- */
/*                              Config                                        */
/* -------------------------------------------------------------------------- */

const configQueryMap = {
  'navbar-vertical-collapsed': 'phoenixIsNavbarVerticalCollapsed',
  'color-scheme': 'phoenixTheme',
  'navigation-type': 'phoenixNavbarPosition',
  'vertical-navbar-appearance': 'phoenixNavbarVerticalStyle',
  'horizontal-navbar-shape': 'phoenixNavbarTopShape',
  'horizontal-navbar-appearance': 'phoenixNavbarTopStyle'
};

const initialConfig = {
  phoenixIsNavbarVerticalCollapsed: false,
  phoenixTheme: 'dark',
  phoenixNavbarTopStyle: 'dark',
  phoenixNavbarVerticalStyle: 'default',
  phoenixNavbarPosition: 'horizontal',
  phoenixNavbarTopShape: 'default',
  phoenixIsRTL: false,
  phoenixSupportChat: true
};

const CONFIG = { ...initialConfig };

const setConfig = (payload, persist = true) => {
  Object.keys(payload).forEach(key => {
    CONFIG[key] = payload[key];
    if (persist) {
      localStorage.setItem(key, payload[key]);
    }
  });
};

const resetConfig = () => {
  Object.keys(initialConfig).forEach(key => {
    CONFIG[key] = initialConfig[key];
    localStorage.setItem(key, initialConfig[key]);
  });
};

const CONFIG_VERSION = 'phoenix-config-v1-dark-default';
const storedConfigVersion = localStorage.getItem('phoenix-config-version');
if (storedConfigVersion !== CONFIG_VERSION) {
  resetConfig();
  localStorage.setItem('phoenix-config-version', CONFIG_VERSION);
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (
  Object.keys(params).length > 0 &&
  Object.keys(params).includes('theme-control')
) {
  resetConfig();

  Object.keys(params).forEach(param => {
    if (configQueryMap[param]) {
      localStorage.setItem(configQueryMap[param], params[param]);
    }
  });
}

Object.keys(CONFIG).forEach(key => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, CONFIG[key]);
  } else {
    try {
      setConfig({
        [key]: JSON.parse(localStorage.getItem(key))
      });
    } catch {
      setConfig({
        [key]: localStorage.getItem(key)
      });
    }
  }
});

if (!!JSON.parse(localStorage.getItem('phoenixIsNavbarVerticalCollapsed'))) {
  document.documentElement.classList.add('navbar-vertical-collapsed');
}

if (localStorage.getItem('phoenixTheme') === 'dark') {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
} else if (localStorage.getItem('phoenixTheme') === 'auto') {
  document.documentElement.setAttribute(
    'data-bs-theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
}

if (localStorage.getItem('phoenixNavbarPosition') === 'horizontal') {
  document.documentElement.setAttribute('data-navigation-type', 'horizontal');
}

if (localStorage.getItem('phoenixNavbarPosition') === 'combo') {
  document.documentElement.setAttribute('data-navigation-type', 'combo');
}

export default {
  config: CONFIG,
  reset: resetConfig,
  set: setConfig
};
