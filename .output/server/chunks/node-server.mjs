globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"apiBase":"http://admin.mfconline.me","api":{"AuthLoginApi":"/api/identity/token","AuthRegisterApi":"/Auth/RegisterRequest","AuthRefreshTokenApi":"/api/identity/token/refresh","BlocksGetAllApi":"/api/Blocks/GetAll","BlocksGetAllWithAttachmentsApi":"/api/Blocks/GetAllWithAttachments","BlocksGetByCategoryApi":"/api/Blocks/GetByCategory","BlocksGetByIdApi":"/api/Blocks/","BlocksGetByIdWithAttachmentsApi":"/api/Blocks/GetWithAttachments/","BordersGetAllApi":"/api/Borders/GetAll","CardTypesGetAllApi":"/api/CardTypes/GetAll","CompanyClientsApi":"/api/CompanyClients","ClientOrdersApi":"/api/Products/GetForCurrentClient","CitiesGetAllApi":"/api/Cities/GetAll","CitiesByCountryApi":"/api/Cities/GetByCountry/","CurrenciesGetAllApi":"/api/Currencies/GetAll","CountriesGetAllApi":"/api/Countries/GetAll","LogoGetReadyApi":"/api/Logos/GetReady","LogoGetAllApi":"/api/Logos/GetAll","GalleryGetPaginationsApi":"/api/Gallery","GetCurrentPersonInfoApi":"/api/PersonClients/GetCurrentPersonInfo","GetCurrentCompanyInfoApi":"/api/CompanyClients/GetCurrentCompanyInfo","MetalsGetByProductCategoryApi":"/api/Metals/GetByProductCategory/","MenusGetByCategoryApi":"/api/Menus/GetByCategory","NationalitiesGetAllApi":"/api/Nationalities/GetAll","PagesGetByIdApi":"/api/Pages/","PagesGetAllApi":"/api/Pages/GetAll","PricesGetAllApi":"/api/Prices/GetAll","ProductsApi":"/api/Products","ProductsCategoryApi":"/api/ProductCategories/GetAll","PersonClientsApi":"/api/PersonClients","RearsGetAllApi":"/api/Rears/GetAll"}},"serverApiBase":"http://admin.mfconline.me/","serverApi":{"AuthLoginApi":"/api/identity/token"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/font/Family-Care-Pharmacy-O.jpg": {
    "type": "image/jpeg",
    "etag": "\"618c94-e7Yse2ueR+vWhMUt9r4bYZZ8Uxs\"",
    "mtime": "2023-04-30T15:01:29.971Z",
    "size": 6392980,
    "path": "../public/font/Family-Care-Pharmacy-O.jpg"
  },
  "/font/Poppins.rar": {
    "type": "application/vnd.rar",
    "etag": "\"12d78c-9ScyJeMqpj9U0WVBiVJ6g/Cc05U\"",
    "mtime": "2023-04-30T14:38:02.559Z",
    "size": 1234828,
    "path": "../public/font/Poppins.rar"
  },
  "/icons/aries.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a33-AhraIe2f0ODvHQLkmhe5WtIAXYs\"",
    "mtime": "2023-03-27T15:43:47.930Z",
    "size": 6707,
    "path": "../public/icons/aries.svg"
  },
  "/icons/cancer.svg": {
    "type": "image/svg+xml",
    "etag": "\"30d8-3GiM7Z6S4weGQaObG/mhsv4qgmQ\"",
    "mtime": "2023-03-27T15:48:00.154Z",
    "size": 12504,
    "path": "../public/icons/cancer.svg"
  },
  "/icons/footer-logo.png": {
    "type": "image/png",
    "etag": "\"7d79-JyqN1JwxMkmaDhhww1B4zqAY6gQ\"",
    "mtime": "2023-01-07T19:24:32.172Z",
    "size": 32121,
    "path": "../public/icons/footer-logo.png"
  },
  "/icons/gemini.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a28-5wJXtlEum4ml2EjzwEIJLP+YJdI\"",
    "mtime": "2023-03-27T15:45:36.605Z",
    "size": 23080,
    "path": "../public/icons/gemini.svg"
  },
  "/icons/gold-corner-border.png": {
    "type": "image/png",
    "etag": "\"70a-Hq3HHHvYKfhG29GP4rLm+iJS7FI\"",
    "mtime": "2022-12-15T07:49:11.030Z",
    "size": 1802,
    "path": "../public/icons/gold-corner-border.png"
  },
  "/icons/gool.png": {
    "type": "image/png",
    "etag": "\"f3d-BtVL77fowxhZWCBzg0LZJHYucjM\"",
    "mtime": "2023-03-12T11:57:31.360Z",
    "size": 3901,
    "path": "../public/icons/gool.png"
  },
  "/icons/Layer1.png": {
    "type": "image/png",
    "etag": "\"c0c-UFdVLFdxfIdCogqQTixQDQH48Go\"",
    "mtime": "2023-05-06T11:07:03.013Z",
    "size": 3084,
    "path": "../public/icons/Layer1.png"
  },
  "/icons/Layer10.png": {
    "type": "image/png",
    "etag": "\"a10-WxOdOceBa62gg4gSVUzeFEqGAl8\"",
    "mtime": "2023-05-06T11:08:09.988Z",
    "size": 2576,
    "path": "../public/icons/Layer10.png"
  },
  "/icons/Layer11.png": {
    "type": "image/png",
    "etag": "\"b62-W9Zz5Q9tgxnQUn/Oe+UC7LigGOU\"",
    "mtime": "2023-04-30T14:07:02.780Z",
    "size": 2914,
    "path": "../public/icons/Layer11.png"
  },
  "/icons/Layer2.png": {
    "type": "image/png",
    "etag": "\"d78-iEecLhTJd2+f/+kLUX7Gay4pDSw\"",
    "mtime": "2023-05-06T11:07:16.567Z",
    "size": 3448,
    "path": "../public/icons/Layer2.png"
  },
  "/icons/Layer3.png": {
    "type": "image/png",
    "etag": "\"b92-V8PV+qpHaXdE2xKL6Fs39T2RDSM\"",
    "mtime": "2023-05-06T11:07:26.884Z",
    "size": 2962,
    "path": "../public/icons/Layer3.png"
  },
  "/icons/Layer4.png": {
    "type": "image/png",
    "etag": "\"b70-6sLWKpCCutXRk24MAnX+wcWdC/k\"",
    "mtime": "2023-05-06T11:07:38.098Z",
    "size": 2928,
    "path": "../public/icons/Layer4.png"
  },
  "/icons/Layer5.png": {
    "type": "image/png",
    "etag": "\"d84-7HMCGeruy1bIJUqMWFSRKibrQ9c\"",
    "mtime": "2023-05-06T11:07:51.155Z",
    "size": 3460,
    "path": "../public/icons/Layer5.png"
  },
  "/icons/Layer7.png": {
    "type": "image/png",
    "etag": "\"b5c-NOlEt7fRAuMHeP1yl2yT1ySP1c4\"",
    "mtime": "2023-05-06T11:08:01.295Z",
    "size": 2908,
    "path": "../public/icons/Layer7.png"
  },
  "/icons/leo.svg": {
    "type": "image/svg+xml",
    "etag": "\"44fd-XcA3KXNCK/j8MDexmC+zZxE0xao\"",
    "mtime": "2023-03-27T15:48:35.344Z",
    "size": 17661,
    "path": "../public/icons/leo.svg"
  },
  "/icons/lion-face.svg": {
    "type": "image/svg+xml",
    "etag": "\"7065-XChQNuvcnfxVStc/P9l3v2f1d/0\"",
    "mtime": "2023-03-27T15:41:47.646Z",
    "size": 28773,
    "path": "../public/icons/lion-face.svg"
  },
  "/icons/login.png": {
    "type": "image/png",
    "etag": "\"e40-c+ViYmFf474MDIMxazdJkXv1X1g\"",
    "mtime": "2023-04-30T14:20:31.868Z",
    "size": 3648,
    "path": "../public/icons/login.png"
  },
  "/icons/logo.png": {
    "type": "image/png",
    "etag": "\"3373b-hZwHBlhdEI1j5UeUG8pSmNYOSU4\"",
    "mtime": "2023-01-17T10:08:56.027Z",
    "size": 210747,
    "path": "../public/icons/logo.png"
  },
  "/icons/Luxmetallic gold shades 1 .png": {
    "type": "image/png",
    "etag": "\"ccc-Ms/YL5Wi5WTWfW0lxN9+cZtWNls\"",
    "mtime": "2022-12-15T07:49:11.022Z",
    "size": 3276,
    "path": "../public/icons/Luxmetallic gold shades 1 .png"
  },
  "/icons/pointer.png": {
    "type": "image/png",
    "etag": "\"301e-BZ4enrCfohrlEoLfZTW7haytBHw\"",
    "mtime": "2023-03-12T11:57:31.366Z",
    "size": 12318,
    "path": "../public/icons/pointer.png"
  },
  "/icons/secure.png": {
    "type": "image/png",
    "etag": "\"b4e-l6s/mhpTblYhlBR9n7As9PCWfZQ\"",
    "mtime": "2023-03-12T11:57:31.302Z",
    "size": 2894,
    "path": "../public/icons/secure.png"
  },
  "/icons/sm-black-logo.png": {
    "type": "image/png",
    "etag": "\"e82-RmpIXpoNZ5AUp4QdKOq+9pu8g48\"",
    "mtime": "2023-01-15T08:55:36.467Z",
    "size": 3714,
    "path": "../public/icons/sm-black-logo.png"
  },
  "/icons/sm-white-logo.png": {
    "type": "image/png",
    "etag": "\"7dc-LrozJhw8HmX6PWh+U3amxm8TkJI\"",
    "mtime": "2022-12-15T07:49:10.961Z",
    "size": 2012,
    "path": "../public/icons/sm-white-logo.png"
  },
  "/icons/success.png": {
    "type": "image/png",
    "etag": "\"b0b-aZbPAaq5U0fp0NSKZdBPYI3hqLk\"",
    "mtime": "2023-03-12T11:57:31.245Z",
    "size": 2827,
    "path": "../public/icons/success.png"
  },
  "/icons/tarus.svg": {
    "type": "image/svg+xml",
    "etag": "\"214a-vjQhsZa6F2DkoOtdLOFsEOrCHGo\"",
    "mtime": "2023-03-27T15:42:32.236Z",
    "size": 8522,
    "path": "../public/icons/tarus.svg"
  },
  "/icons/upload-logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"6ce-WIueVew4g1fwHljXruIyUo0gfM8\"",
    "mtime": "2023-03-28T10:54:30.004Z",
    "size": 1742,
    "path": "../public/icons/upload-logo.svg"
  },
  "/icons/user-add.png": {
    "type": "image/png",
    "etag": "\"e9a-xaXj81yo5kfLjDS3S8uuUepcFw4\"",
    "mtime": "2023-04-30T14:12:44.118Z",
    "size": 3738,
    "path": "../public/icons/user-add.png"
  },
  "/icons/what-we-do-icon-1.png": {
    "type": "image/png",
    "etag": "\"793-qvEwNSDf2BbF5trf1LrwZVjaQO8\"",
    "mtime": "2023-03-12T12:04:26.151Z",
    "size": 1939,
    "path": "../public/icons/what-we-do-icon-1.png"
  },
  "/icons/what-we-do-icon-2.png": {
    "type": "image/png",
    "etag": "\"76c-JVHwDuz58bqmLqrcDbm7sNid3MU\"",
    "mtime": "2023-03-12T12:04:26.156Z",
    "size": 1900,
    "path": "../public/icons/what-we-do-icon-2.png"
  },
  "/icons/what-we-do-icon-3.png": {
    "type": "image/png",
    "etag": "\"806-zt7iVDL+Vl2HziLffdp0LyN43xc\"",
    "mtime": "2023-03-12T12:04:26.150Z",
    "size": 2054,
    "path": "../public/icons/what-we-do-icon-3.png"
  },
  "/icons/what-we-do-icon-4.png": {
    "type": "image/png",
    "etag": "\"8bb-8DbMsExNoy7yQsJRwyqvH+oE0LI\"",
    "mtime": "2023-03-12T12:04:26.128Z",
    "size": 2235,
    "path": "../public/icons/what-we-do-icon-4.png"
  },
  "/partners/169050.png": {
    "type": "image/png",
    "etag": "\"30af-2FEr1TznM6Xz8Nj09uBW9DXASvU\"",
    "mtime": "2023-04-30T14:29:17.895Z",
    "size": 12463,
    "path": "../public/partners/169050.png"
  },
  "/partners/360_F_109837725_zeOEDAaqKZTgKKTQ.png": {
    "type": "image/png",
    "etag": "\"4e75-wYYv3tAMvGD4G5SuARK0VF4yrSQ\"",
    "mtime": "2023-04-30T14:29:17.551Z",
    "size": 20085,
    "path": "../public/partners/360_F_109837725_zeOEDAaqKZTgKKTQ.png"
  },
  "/partners/b86255cf9dfbacad1e109ca21d921041.png": {
    "type": "image/png",
    "etag": "\"5a4d-Uw274uEqE2mUiv5n1NB6vfKaNyA\"",
    "mtime": "2023-04-30T14:29:18.183Z",
    "size": 23117,
    "path": "../public/partners/b86255cf9dfbacad1e109ca21d921041.png"
  },
  "/partners/LD-C-5.png": {
    "type": "image/png",
    "etag": "\"3f59-nGd+8A4BI79zCUwy0C2GkGcveKo\"",
    "mtime": "2023-04-30T14:29:17.202Z",
    "size": 16217,
    "path": "../public/partners/LD-C-5.png"
  },
  "/partners/logo-represent-beauty-shiny-good.png": {
    "type": "image/png",
    "etag": "\"440a-sShpDIDAKVExVwfKpVNjFb0yuDs\"",
    "mtime": "2023-04-30T14:29:16.777Z",
    "size": 17418,
    "path": "../public/partners/logo-represent-beauty-shiny-good.png"
  },
  "/partners/png-transparent-logo-organizatio.png": {
    "type": "image/png",
    "etag": "\"79f0-VMJBDXhULeQYmNWCrJuM3m+kChE\"",
    "mtime": "2023-04-30T14:29:18.535Z",
    "size": 31216,
    "path": "../public/partners/png-transparent-logo-organizatio.png"
  },
  "/partners/rapy-pfizer-logo-blue-label-text.png": {
    "type": "image/png",
    "etag": "\"4724-RMNxRgMS7qzwdfOVrXgvSF2egbI\"",
    "mtime": "2023-04-30T14:29:18.823Z",
    "size": 18212,
    "path": "../public/partners/rapy-pfizer-logo-blue-label-text.png"
  },
  "/partners/Rectangle 6 copy 6.png": {
    "type": "image/png",
    "etag": "\"3a8-g/e+QSMv4NSFE03sYJ9J2f3V1rI\"",
    "mtime": "2023-04-30T14:29:52.957Z",
    "size": 936,
    "path": "../public/partners/Rectangle 6 copy 6.png"
  },
  "/images/ad_01.png": {
    "type": "image/png",
    "etag": "\"455a2-S/42wt/Mh0LFGyuCjs/wlGB00gQ\"",
    "mtime": "2023-04-30T14:00:52.686Z",
    "size": 284066,
    "path": "../public/images/ad_01.png"
  },
  "/images/bg-about-us.webp": {
    "type": "image/webp",
    "etag": "\"3e8a2-hJXbbqVuRK+wahpFUlgIvDcG1HQ\"",
    "mtime": "2023-01-21T11:52:20.366Z",
    "size": 256162,
    "path": "../public/images/bg-about-us.webp"
  },
  "/images/bg-home-about-us-icons.png": {
    "type": "image/png",
    "etag": "\"281e3-rMcC7u612eK8G1vX2DyQfKE2mJ4\"",
    "mtime": "2023-04-30T13:36:03.872Z",
    "size": 164323,
    "path": "../public/images/bg-home-about-us-icons.png"
  },
  "/images/bg-home-about-us.webp": {
    "type": "image/webp",
    "etag": "\"43124-A/drs4XBCDIDFFJGC9lTvWJTPQA\"",
    "mtime": "2023-04-30T13:28:24.965Z",
    "size": 274724,
    "path": "../public/images/bg-home-about-us.webp"
  },
  "/images/bg-how-work.webp": {
    "type": "image/webp",
    "etag": "\"7bc02-MQSMJBSAiHXun4U5krc2h1iU7nE\"",
    "mtime": "2023-01-21T11:19:56.603Z",
    "size": 506882,
    "path": "../public/images/bg-how-work.webp"
  },
  "/images/bg-our-products.webp": {
    "type": "image/webp",
    "etag": "\"2e442-vqtlnRxbzx6fLskPq2ifRjo7LnM\"",
    "mtime": "2023-01-21T11:19:16.612Z",
    "size": 189506,
    "path": "../public/images/bg-our-products.webp"
  },
  "/images/bg-special-offers.webp": {
    "type": "image/webp",
    "etag": "\"24062-oGQDlUAKNek7djwHIGNrWwCh8lg\"",
    "mtime": "2023-01-21T11:46:34.344Z",
    "size": 147554,
    "path": "../public/images/bg-special-offers.webp"
  },
  "/images/download(1).png": {
    "type": "image/png",
    "etag": "\"dcf-vUhHacbD7zoQZbKDTjP0kidkTLk\"",
    "mtime": "2023-04-30T14:19:40.275Z",
    "size": 3535,
    "path": "../public/images/download(1).png"
  },
  "/images/e.png": {
    "type": "image/png",
    "etag": "\"6bc3-G/P9nOaexAVZhIkV3O5AeZ/abmo\"",
    "mtime": "2023-04-30T14:20:41.737Z",
    "size": 27587,
    "path": "../public/images/e.png"
  },
  "/images/error-bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"8c06-iu17M5ElFMjagjXeXCvXsOLI/vU\"",
    "mtime": "2023-03-24T18:22:01.603Z",
    "size": 35846,
    "path": "../public/images/error-bg.jpg"
  },
  "/images/FAMILY CARE PHARMACY logo.jpg": {
    "type": "image/jpeg",
    "etag": "\"93b48-5FIUyXmQKKXlauYfXzSNH7NCGQA\"",
    "mtime": "2023-05-03T08:52:00.542Z",
    "size": 605000,
    "path": "../public/images/FAMILY CARE PHARMACY logo.jpg"
  },
  "/images/FAMILYCAREPHARMACYlogo.png": {
    "type": "image/png",
    "etag": "\"1967f-m7BsnAmAQf6VyPwQxMSuqAw6DhE\"",
    "mtime": "2023-05-03T08:52:03.366Z",
    "size": 104063,
    "path": "../public/images/FAMILYCAREPHARMACYlogo.png"
  },
  "/images/Group 21.png": {
    "type": "image/png",
    "etag": "\"15f02-kC56l2od4X1whsTTO4wSyupmYo0\"",
    "mtime": "2023-04-30T14:13:51.460Z",
    "size": 89858,
    "path": "../public/images/Group 21.png"
  },
  "/images/Group 26.png": {
    "type": "image/png",
    "etag": "\"fd015-Ve+WPwy57yTo6CjAX8V1as4k0Xg\"",
    "mtime": "2023-04-30T14:13:34.924Z",
    "size": 1036309,
    "path": "../public/images/Group 26.png"
  },
  "/images/Group 26_.png": {
    "type": "image/png",
    "etag": "\"1125e1-QhJxWWeJPukc1aKgLGj/CNX97E4\"",
    "mtime": "2023-04-30T14:15:06.426Z",
    "size": 1123809,
    "path": "../public/images/Group 26_.png"
  },
  "/images/how-it-works.webp": {
    "type": "image/webp",
    "etag": "\"887d6-0VMPCwKSmMFjI4tKKpEYH89IubM\"",
    "mtime": "2023-03-12T15:20:49.419Z",
    "size": 559062,
    "path": "../public/images/how-it-works.webp"
  },
  "/images/img_(1).png": {
    "type": "image/png",
    "etag": "\"aac-RuNOY72BE062Gphmh1z+Q0r7aHI\"",
    "mtime": "2023-04-30T13:57:01.843Z",
    "size": 2732,
    "path": "../public/images/img_(1).png"
  },
  "/images/land-page.webp": {
    "type": "image/webp",
    "etag": "\"9676-yR7CfiVM6xti1x9EHiLHaRBzDAc\"",
    "mtime": "2023-02-15T16:47:32.080Z",
    "size": 38518,
    "path": "../public/images/land-page.webp"
  },
  "/images/Layer 13 copy 3.png": {
    "type": "image/png",
    "etag": "\"238-381mJzoXZY2IEL8py4nK1dCdXVU\"",
    "mtime": "2023-04-30T14:28:08.164Z",
    "size": 568,
    "path": "../public/images/Layer 13 copy 3.png"
  },
  "/images/Layer 16.png": {
    "type": "image/png",
    "etag": "\"114f-P+owWzQQGGR0aRmnfnO65Np4T68\"",
    "mtime": "2023-04-30T14:18:02.841Z",
    "size": 4431,
    "path": "../public/images/Layer 16.png"
  },
  "/images/Layer 16_.png": {
    "type": "image/png",
    "etag": "\"137d-5FKg4W7xk8w3XIF5KRho8F5YJuk\"",
    "mtime": "2023-04-30T14:16:00.706Z",
    "size": 4989,
    "path": "../public/images/Layer 16_.png"
  },
  "/images/Layer 6.png": {
    "type": "image/png",
    "etag": "\"d2-QWWqUlX0nFra9rV7IQuk88s7cNY\"",
    "mtime": "2023-04-30T14:00:14.634Z",
    "size": 210,
    "path": "../public/images/Layer 6.png"
  },
  "/images/Layer1.png": {
    "type": "image/png",
    "etag": "\"15a8-/egPU172V/q3PNoZuF9WgVJeL+k\"",
    "mtime": "2023-04-30T14:33:27.493Z",
    "size": 5544,
    "path": "../public/images/Layer1.png"
  },
  "/images/Layer2.png": {
    "type": "image/png",
    "etag": "\"1318-PsAVHkHtDBIBG8azK1bGvkVPfKQ\"",
    "mtime": "2023-04-30T14:33:27.487Z",
    "size": 4888,
    "path": "../public/images/Layer2.png"
  },
  "/images/Layer3.png": {
    "type": "image/png",
    "etag": "\"183c-Lq70ukL0tddKXj0XOZum0PGzB1M\"",
    "mtime": "2023-04-30T14:33:27.483Z",
    "size": 6204,
    "path": "../public/images/Layer3.png"
  },
  "/images/Layer4.png": {
    "type": "image/png",
    "etag": "\"268a-CXWslGSSdmPvI82dgpBEfTjUxdM\"",
    "mtime": "2023-04-30T14:33:27.477Z",
    "size": 9866,
    "path": "../public/images/Layer4.png"
  },
  "/images/Layer9.png": {
    "type": "image/png",
    "etag": "\"25f-gaYIAa1o8+PHIKn6pJDMcE8jUnc\"",
    "mtime": "2023-04-30T14:00:28.353Z",
    "size": 607,
    "path": "../public/images/Layer9.png"
  },
  "/images/master-card.png": {
    "type": "image/png",
    "etag": "\"4e74d-irn5tDw2j8MXf7W3kiAavpL1JXk\"",
    "mtime": "2023-01-24T18:35:14.065Z",
    "size": 321357,
    "path": "../public/images/master-card.png"
  },
  "/images/online-support-icon-15.png": {
    "type": "image/png",
    "etag": "\"db9-zxox2zegeYOzlgUGHwTN4CbyM8E\"",
    "mtime": "2023-04-30T14:19:39.717Z",
    "size": 3513,
    "path": "../public/images/online-support-icon-15.png"
  },
  "/images/payment-methods.png": {
    "type": "image/png",
    "etag": "\"d7c-TgXXmfDZ5P0nybLgHapA6G5/4i0\"",
    "mtime": "2023-04-30T14:19:39.979Z",
    "size": 3452,
    "path": "../public/images/payment-methods.png"
  },
  "/images/pngegg (30).png": {
    "type": "image/png",
    "etag": "\"250-h1n84rI9iTJw7InaY20o4j+86T4\"",
    "mtime": "2023-04-30T13:59:58.572Z",
    "size": 592,
    "path": "../public/images/pngegg (30).png"
  },
  "/images/pngegg (33) copy 2.png": {
    "type": "image/png",
    "etag": "\"142-DQ4fYaVe3xWfEjCIiP+kcugMsk8\"",
    "mtime": "2023-04-30T14:07:02.807Z",
    "size": 322,
    "path": "../public/images/pngegg (33) copy 2.png"
  },
  "/images/pngegg (33).png": {
    "type": "image/png",
    "etag": "\"73e-3GGnUXXZs6yC2qzFMEwjF9Uk0R4\"",
    "mtime": "2023-04-30T14:10:10.453Z",
    "size": 1854,
    "path": "../public/images/pngegg (33).png"
  },
  "/images/pngegg (34) copy.png": {
    "type": "image/png",
    "etag": "\"9c0-NkEqhwci7pOyi0xJg2gMO9jkKBU\"",
    "mtime": "2023-04-30T14:10:29.355Z",
    "size": 2496,
    "path": "../public/images/pngegg (34) copy.png"
  },
  "/images/pngegg(31).png": {
    "type": "image/png",
    "etag": "\"ba4-DtTy9Fr8LmcU2E8XnWZAAgUefGM\"",
    "mtime": "2023-04-30T14:19:21.673Z",
    "size": 2980,
    "path": "../public/images/pngegg(31).png"
  },
  "/images/Rectangle 10.png": {
    "type": "image/png",
    "etag": "\"29b8-D4/dcM6BnWdv/DMnOUtFUwFwim4\"",
    "mtime": "2023-04-30T14:05:35.188Z",
    "size": 10680,
    "path": "../public/images/Rectangle 10.png"
  },
  "/images/Rectangle 11 copy 2.png": {
    "type": "image/png",
    "etag": "\"44e30-lTWZV9bs/Mcax7+/R64W4rz1KaY\"",
    "mtime": "2023-04-30T14:26:30.616Z",
    "size": 282160,
    "path": "../public/images/Rectangle 11 copy 2.png"
  },
  "/images/Rectangle 11 copy.png": {
    "type": "image/png",
    "etag": "\"3fac8-IAYT1UPk9ToqJQFIqk8Im6c57hM\"",
    "mtime": "2023-04-30T14:26:31.126Z",
    "size": 260808,
    "path": "../public/images/Rectangle 11 copy.png"
  },
  "/images/Rectangle 11.png": {
    "type": "image/png",
    "etag": "\"afd4d-L9fKXA3p149FoZP3p8tQI/T5JaA\"",
    "mtime": "2023-04-30T14:26:31.779Z",
    "size": 720205,
    "path": "../public/images/Rectangle 11.png"
  },
  "/images/Rectangle 5.png": {
    "type": "image/png",
    "etag": "\"6a3-vMa9B1l+VOZPvaduxGEMnkZJ25M\"",
    "mtime": "2023-04-30T14:23:27.130Z",
    "size": 1699,
    "path": "../public/images/Rectangle 5.png"
  },
  "/images/Rectangle 8.png": {
    "type": "image/png",
    "etag": "\"277c-DUX72LQEP6pQtX3MZwvbwrWTeBs\"",
    "mtime": "2023-04-30T14:04:55.095Z",
    "size": 10108,
    "path": "../public/images/Rectangle 8.png"
  },
  "/images/Rectangle 8_.png": {
    "type": "image/png",
    "etag": "\"2980-BD08lyh0kBMSM7Wk7az3e3CQ/8g\"",
    "mtime": "2023-04-30T14:05:58.356Z",
    "size": 10624,
    "path": "../public/images/Rectangle 8_.png"
  },
  "/images/special-offers-old.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eecb-1oCWuB/eJsj5TcKcN4rX7Y9KL7w\"",
    "mtime": "2023-01-25T18:36:02.354Z",
    "size": 126667,
    "path": "../public/images/special-offers-old.jpg"
  },
  "/images/union-pay.png": {
    "type": "image/png",
    "etag": "\"3faa5-Q57s1z3/Ko6RyzpSlz6C6EyuJw0\"",
    "mtime": "2023-01-24T18:35:04.786Z",
    "size": 260773,
    "path": "../public/images/union-pay.png"
  },
  "/images/visa-card.png": {
    "type": "image/png",
    "etag": "\"23234-2zBb3odEHM98CMllZskGozu0AC8\"",
    "mtime": "2023-01-24T18:35:18.311Z",
    "size": 143924,
    "path": "../public/images/visa-card.png"
  },
  "/images/what-we-do.png": {
    "type": "image/png",
    "etag": "\"abbfd-yGx/jGjgCMo9Jg4VY9j8ljAIFus\"",
    "mtime": "2023-03-12T12:06:19.252Z",
    "size": 703485,
    "path": "../public/images/what-we-do.png"
  },
  "/images/‏‏pngegg (33) - copy.png": {
    "type": "image/png",
    "etag": "\"b08-CFIbSUgmglKKVCuZW6NXbXNhAv8\"",
    "mtime": "2023-04-30T14:41:31.599Z",
    "size": 2824,
    "path": "../public/images/‏‏pngegg (33) - copy.png"
  },
  "/images/‏‏pngegg (34).png": {
    "type": "image/png",
    "etag": "\"b5e-WeEWNSjRPA9xTz8Wf7mnRzsUlJE\"",
    "mtime": "2023-04-30T14:42:16.459Z",
    "size": 2910,
    "path": "../public/images/‏‏pngegg (34).png"
  },
  "/products/pngegg(10).png": {
    "type": "image/png",
    "etag": "\"bcca-sM33RbzSSOA0Qsv2nwXOQTbxuuA\"",
    "mtime": "2023-04-30T14:34:56.752Z",
    "size": 48330,
    "path": "../public/products/pngegg(10).png"
  },
  "/products/pngegg(11).png": {
    "type": "image/png",
    "etag": "\"a3bb-gU1Pj860KDhK08y7/Bl2JOwKS34\"",
    "mtime": "2023-04-30T14:25:51.536Z",
    "size": 41915,
    "path": "../public/products/pngegg(11).png"
  },
  "/products/pngegg(2).png": {
    "type": "image/png",
    "etag": "\"115c8-oI/U4Lbcp1vR0Yvxt5Pg3WPoNS0\"",
    "mtime": "2023-04-30T14:35:40.810Z",
    "size": 71112,
    "path": "../public/products/pngegg(2).png"
  },
  "/products/pngegg(3).png": {
    "type": "image/png",
    "etag": "\"7df6-JrJpV+gU+xqZGpCR7rFom+yDUD8\"",
    "mtime": "2023-04-30T14:25:52.903Z",
    "size": 32246,
    "path": "../public/products/pngegg(3).png"
  },
  "/products/pngegg(4).png": {
    "type": "image/png",
    "etag": "\"113a2-ntqDT5dIINqoyqg3odh2eicdkZY\"",
    "mtime": "2023-04-30T14:25:52.625Z",
    "size": 70562,
    "path": "../public/products/pngegg(4).png"
  },
  "/products/pngegg(5).png": {
    "type": "image/png",
    "etag": "\"12072-9Sm2vG0NUOVw3paMRc2K/49WAIc\"",
    "mtime": "2023-04-30T14:25:53.482Z",
    "size": 73842,
    "path": "../public/products/pngegg(5).png"
  },
  "/products/pngegg(6).png": {
    "type": "image/png",
    "etag": "\"3bd2-xmDTanrjWlb+VQdn145xEDkhVQo\"",
    "mtime": "2023-04-30T14:25:52.078Z",
    "size": 15314,
    "path": "../public/products/pngegg(6).png"
  },
  "/products/pngegg(7).png": {
    "type": "image/png",
    "etag": "\"e00f-8ap37UYdwucidPPAvVSusXl83ZM\"",
    "mtime": "2023-04-30T14:25:52.351Z",
    "size": 57359,
    "path": "../public/products/pngegg(7).png"
  },
  "/products/pngegg(9).png": {
    "type": "image/png",
    "etag": "\"10a56-QaVT6LT86zmHuXVDv0ZDvMGazo0\"",
    "mtime": "2023-04-30T14:25:51.812Z",
    "size": 68182,
    "path": "../public/products/pngegg(9).png"
  },
  "/products/pngegg.png": {
    "type": "image/png",
    "etag": "\"8344-e8CJIVisXWY/q5JcubXhbLyJfIg\"",
    "mtime": "2023-04-30T14:25:53.198Z",
    "size": 33604,
    "path": "../public/products/pngegg.png"
  },
  "/photos/Rectangle12.png": {
    "type": "image/png",
    "etag": "\"7e463-wHCwNMj8thmAzdsolfCvu2bZJUg\"",
    "mtime": "2023-04-30T14:22:40.006Z",
    "size": 517219,
    "path": "../public/photos/Rectangle12.png"
  },
  "/photos/Rectangle12copy.png": {
    "type": "image/png",
    "etag": "\"8961f-MyH5/+dJgxNqm33sCSFE760aKr0\"",
    "mtime": "2023-04-30T14:22:39.531Z",
    "size": 562719,
    "path": "../public/photos/Rectangle12copy.png"
  },
  "/photos/Rectangle12copy2.png": {
    "type": "image/png",
    "etag": "\"7af43-iMPnCvuwWstgImf1zc0d8VA3PlE\"",
    "mtime": "2023-04-30T14:22:39.064Z",
    "size": 503619,
    "path": "../public/photos/Rectangle12copy2.png"
  },
  "/photos/Rectangle12copy3.png": {
    "type": "image/png",
    "etag": "\"65bf1-HdcSs/Lh5JHmw3xUL4TuzcUAb+M\"",
    "mtime": "2023-04-30T14:22:38.617Z",
    "size": 416753,
    "path": "../public/photos/Rectangle12copy3.png"
  },
  "/_nuxt/auth.ec02f9b9.js": {
    "type": "application/javascript",
    "etag": "\"96-By5NADVJrND6UsycwtjmeBDzGZg\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 150,
    "path": "../public/_nuxt/auth.ec02f9b9.js"
  },
  "/_nuxt/composables.327f3007.js": {
    "type": "application/javascript",
    "etag": "\"61-Jl/muiMkshdOYDjQJOWt7e2nMEw\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 97,
    "path": "../public/_nuxt/composables.327f3007.js"
  },
  "/_nuxt/default.49cd5b89.js": {
    "type": "application/javascript",
    "etag": "\"35aa-8Q45Mnm3LQHg+rsx8YzBmQw+23c\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 13738,
    "path": "../public/_nuxt/default.49cd5b89.js"
  },
  "/_nuxt/default.b83e4707.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24b8-gPaUvahi8qGHqCEEXJcBhaJFJtg\"",
    "mtime": "2023-05-12T09:30:33.956Z",
    "size": 9400,
    "path": "../public/_nuxt/default.b83e4707.css"
  },
  "/_nuxt/edit.7c841d45.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"958-CLvX2Xyct9DvYkEOj4OyNMBksxk\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 2392,
    "path": "../public/_nuxt/edit.7c841d45.css"
  },
  "/_nuxt/edit.805521c1.js": {
    "type": "application/javascript",
    "etag": "\"2e88-Xfz6gtaPoDWP7t4DjdK3Xzyppt4\"",
    "mtime": "2023-05-12T09:30:33.926Z",
    "size": 11912,
    "path": "../public/_nuxt/edit.805521c1.js"
  },
  "/_nuxt/entry.2e476155.js": {
    "type": "application/javascript",
    "etag": "\"172c1d-z/YDdE5Gd4dHWobw/flEVvf5zmc\"",
    "mtime": "2023-05-12T09:30:33.926Z",
    "size": 1518621,
    "path": "../public/_nuxt/entry.2e476155.js"
  },
  "/_nuxt/entry.584736f9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f292-urh6F8w2y4dg4y9B/SjWNEFbJIo\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 62098,
    "path": "../public/_nuxt/entry.584736f9.css"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.ad9e3bd4.js": {
    "type": "application/javascript",
    "etag": "\"8cf-JQZ4yN9pgrvEC7LR6D8UshtFLJw\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 2255,
    "path": "../public/_nuxt/error-404.ad9e3bd4.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.cd8da6a4.js": {
    "type": "application/javascript",
    "etag": "\"77d-wxplgW1bfcTigTxFQ2kpOwTivDk\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 1917,
    "path": "../public/_nuxt/error-500.cd8da6a4.js"
  },
  "/_nuxt/error-component.d549c7b0.js": {
    "type": "application/javascript",
    "etag": "\"4ad-4NoFtwbr0j4R6kWWGZNbK2oFAfw\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 1197,
    "path": "../public/_nuxt/error-component.d549c7b0.js"
  },
  "/_nuxt/Image.6ee0a0d5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"48f-NTjD1xz133lJ7PFJWDUS7QyIsAE\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 1167,
    "path": "../public/_nuxt/Image.6ee0a0d5.css"
  },
  "/_nuxt/Image.85211d38.js": {
    "type": "application/javascript",
    "etag": "\"4f4-UglZjS6DzuvaPSnclEw+Cywn1SY\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 1268,
    "path": "../public/_nuxt/Image.85211d38.js"
  },
  "/_nuxt/index.45212d9e.js": {
    "type": "application/javascript",
    "etag": "\"15c8-mCjNrD7OKJetkdNEQYqsxCtVqJo\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 5576,
    "path": "../public/_nuxt/index.45212d9e.js"
  },
  "/_nuxt/index.8d3a971a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1fb-ITcYr3EX9DpbAbbSERpkXBv0C0g\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 507,
    "path": "../public/_nuxt/index.8d3a971a.css"
  },
  "/_nuxt/index.a26f4b18.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1be0-ndsgVlWafpXHehebjTzTnQvdLNQ\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 7136,
    "path": "../public/_nuxt/index.a26f4b18.css"
  },
  "/_nuxt/index.aa20ab6f.js": {
    "type": "application/javascript",
    "etag": "\"30e4-bHB7PtQF07XvW3H7atXCQz6WMZQ\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 12516,
    "path": "../public/_nuxt/index.aa20ab6f.js"
  },
  "/_nuxt/index.b56fd9ca.js": {
    "type": "application/javascript",
    "etag": "\"c079-SzA5Mw4E4+yzRU7ydZKZiF8dgAc\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 49273,
    "path": "../public/_nuxt/index.b56fd9ca.js"
  },
  "/_nuxt/index.de5c2b00.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"890-tVIM5N+DS6su34tzV5ApQ9SWZB8\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 2192,
    "path": "../public/_nuxt/index.de5c2b00.css"
  },
  "/_nuxt/khalaad-Sara.dbe2b1e0.ttf": {
    "type": "font/ttf",
    "etag": "\"1efdc-cUpQeA6aaWuJZ55H9SUy99u+4/M\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 126940,
    "path": "../public/_nuxt/khalaad-Sara.dbe2b1e0.ttf"
  },
  "/_nuxt/Layer11.6e4e3ee7.js": {
    "type": "application/javascript",
    "etag": "\"4d-NOzFjkdsHYCWaXRthyNGWodd5YU\"",
    "mtime": "2023-05-12T09:30:33.926Z",
    "size": 77,
    "path": "../public/_nuxt/Layer11.6e4e3ee7.js"
  },
  "/_nuxt/login.604a335f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61b-J0+9O1j6p+irLfjrsNFc462b3Qs\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 1563,
    "path": "../public/_nuxt/login.604a335f.css"
  },
  "/_nuxt/login.c953aebf.js": {
    "type": "application/javascript",
    "etag": "\"a6e-84PwxB8/VNnZBekh+AoeYcQQvaw\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 2670,
    "path": "../public/_nuxt/login.c953aebf.js"
  },
  "/_nuxt/not-authorize.0d9b2665.js": {
    "type": "application/javascript",
    "etag": "\"86-xIr2jKNq1ESNLoCZGRj8b4vHi/Q\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 134,
    "path": "../public/_nuxt/not-authorize.0d9b2665.js"
  },
  "/_nuxt/nuxt-icon.39f60e85.js": {
    "type": "application/javascript",
    "etag": "\"28d-iimcrXJpoj85A4kGVQgZGKOuXlE\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 653,
    "path": "../public/_nuxt/nuxt-icon.39f60e85.js"
  },
  "/_nuxt/nuxt-icon.4544dae2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fe-23rdvH8wBVm0gSnUqmHDhubj+to\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 254,
    "path": "../public/_nuxt/nuxt-icon.4544dae2.css"
  },
  "/_nuxt/object.5d43951f.js": {
    "type": "application/javascript",
    "etag": "\"d553-ag5HYuRrRulsaWOWqH9ZVi2DVWQ\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 54611,
    "path": "../public/_nuxt/object.5d43951f.js"
  },
  "/_nuxt/object.c412afb2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"71c-OpGDIhVBI1UqaxfwK8P8SHRNR2U\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 1820,
    "path": "../public/_nuxt/object.c412afb2.css"
  },
  "/_nuxt/Philosopher-Bold.e46667d7.ttf": {
    "type": "font/ttf",
    "etag": "\"1bbc8-UYEy2wi4TcLDwXERuNqAtuNsGBw\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 113608,
    "path": "../public/_nuxt/Philosopher-Bold.e46667d7.ttf"
  },
  "/_nuxt/Philosopher-BoldItalic.b9e38f7c.ttf": {
    "type": "font/ttf",
    "etag": "\"1b598-odNFNa4qDh75NtUp5Y/2pMWvEIk\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 112024,
    "path": "../public/_nuxt/Philosopher-BoldItalic.b9e38f7c.ttf"
  },
  "/_nuxt/Philosopher-Italic.870dd32a.ttf": {
    "type": "font/ttf",
    "etag": "\"1b764-fR8RovFHAOjoBO2WSdl2FVKKMzs\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 112484,
    "path": "../public/_nuxt/Philosopher-Italic.870dd32a.ttf"
  },
  "/_nuxt/Philosopher-Regular.e5b60b34.ttf": {
    "type": "font/ttf",
    "etag": "\"1c358-8keNh2tArpzUne4ufuxcc1XBQF0\"",
    "mtime": "2023-05-12T09:30:33.816Z",
    "size": 115544,
    "path": "../public/_nuxt/Philosopher-Regular.e5b60b34.ttf"
  },
  "/_nuxt/Philosopher.bd77ea93.otf": {
    "type": "font/otf",
    "etag": "\"c424-scN0/jhGIqCKxUdWVB2BofENp54\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 50212,
    "path": "../public/_nuxt/Philosopher.bd77ea93.otf"
  },
  "/_nuxt/Poppins-Black.291e4388.ttf": {
    "type": "font/ttf",
    "etag": "\"24f64-ZF4ExTxrWzW85lSoEevOFq+KpyE\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 151396,
    "path": "../public/_nuxt/Poppins-Black.291e4388.ttf"
  },
  "/_nuxt/Poppins-BlackItalic.a5e3e31e.ttf": {
    "type": "font/ttf",
    "etag": "\"29e54-vk7yqsd3WksBecDs/ObOqPd4P2M\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 171604,
    "path": "../public/_nuxt/Poppins-BlackItalic.a5e3e31e.ttf"
  },
  "/_nuxt/Poppins-Bold.7219547e.ttf": {
    "type": "font/ttf",
    "etag": "\"25958-h1zwzs1ke88i551jPYaMGx7Jjfo\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 153944,
    "path": "../public/_nuxt/Poppins-Bold.7219547e.ttf"
  },
  "/_nuxt/Poppins-BoldItalic.9d4d9f3c.ttf": {
    "type": "font/ttf",
    "etag": "\"2b1cc-beiVLKCNJ+539XNH0s70tOJqp48\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 176588,
    "path": "../public/_nuxt/Poppins-BoldItalic.9d4d9f3c.ttf"
  },
  "/_nuxt/Poppins-ExtraBold.94a215f8.ttf": {
    "type": "font/ttf",
    "etag": "\"254bc-S1wHUPBzq9V2QToImNO5Wtrxmcg\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 152764,
    "path": "../public/_nuxt/Poppins-ExtraBold.94a215f8.ttf"
  },
  "/_nuxt/Poppins-ExtraBoldItalic.bba986e1.ttf": {
    "type": "font/ttf",
    "etag": "\"2a75c-lNPuOs29AON6cVol8rUjdma1uKM\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 173916,
    "path": "../public/_nuxt/Poppins-ExtraBoldItalic.bba986e1.ttf"
  },
  "/_nuxt/Poppins-ExtraLight.60c4bb1b.ttf": {
    "type": "font/ttf",
    "etag": "\"276b0-ha9lgqfmFVkXxgX50/7WjAKyOwY\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 161456,
    "path": "../public/_nuxt/Poppins-ExtraLight.60c4bb1b.ttf"
  },
  "/_nuxt/Poppins-ExtraLightItalic.05418f4d.ttf": {
    "type": "font/ttf",
    "etag": "\"2d738-b6BBj5EDJoDS2P5IQwCfLID6ph0\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 186168,
    "path": "../public/_nuxt/Poppins-ExtraLightItalic.05418f4d.ttf"
  },
  "/_nuxt/Poppins-Italic.3225cec6.ttf": {
    "type": "font/ttf",
    "etag": "\"2c6fc-4r/NVgFsPJFSIe8cX8Ghewd265E\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 182012,
    "path": "../public/_nuxt/Poppins-Italic.3225cec6.ttf"
  },
  "/_nuxt/Poppins-Light.647f014d.ttf": {
    "type": "font/ttf",
    "etag": "\"27094-4kepIVjhEvi/e2OMjZU4HWawDbs\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 159892,
    "path": "../public/_nuxt/Poppins-Light.647f014d.ttf"
  },
  "/_nuxt/Poppins-LightItalic.6d00aa55.ttf": {
    "type": "font/ttf",
    "etag": "\"2d08c-92ECs2HnBXUag7eyL+lU2vHyfdQ\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 184460,
    "path": "../public/_nuxt/Poppins-LightItalic.6d00aa55.ttf"
  },
  "/_nuxt/Poppins-Medium.8d909883.ttf": {
    "type": "font/ttf",
    "etag": "\"26368-KD8htE772/J2uoAr4tlJo2u8QjM\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 156520,
    "path": "../public/_nuxt/Poppins-Medium.8d909883.ttf"
  },
  "/_nuxt/Poppins-MediumItalic.449f6bd9.ttf": {
    "type": "font/ttf",
    "etag": "\"2c0dc-tZLGL9+IxAz9DwMbumQjsdRDBHI\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 180444,
    "path": "../public/_nuxt/Poppins-MediumItalic.449f6bd9.ttf"
  },
  "/_nuxt/Poppins-Regular.707fdc5c.ttf": {
    "type": "font/ttf",
    "etag": "\"26a20-/dMALn2BTuR8HBuEh8csa7s6LQA\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 158240,
    "path": "../public/_nuxt/Poppins-Regular.707fdc5c.ttf"
  },
  "/_nuxt/Poppins-SemiBold.248c0244.ttf": {
    "type": "font/ttf",
    "etag": "\"25e60-ikrOk5LQa8t/jqL1FpsH5MODqQ0\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 155232,
    "path": "../public/_nuxt/Poppins-SemiBold.248c0244.ttf"
  },
  "/_nuxt/Poppins-SemiBoldItalic.74b31cbc.ttf": {
    "type": "font/ttf",
    "etag": "\"2b998-DIvtCllCsjiNNrEcEVaF2fAXALA\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 178584,
    "path": "../public/_nuxt/Poppins-SemiBoldItalic.74b31cbc.ttf"
  },
  "/_nuxt/Poppins-Thin.95875f9e.ttf": {
    "type": "font/ttf",
    "etag": "\"27774-CbpNzVUJyAhb+IxmXcxRy9/O0ns\"",
    "mtime": "2023-05-12T09:30:33.796Z",
    "size": 161652,
    "path": "../public/_nuxt/Poppins-Thin.95875f9e.ttf"
  },
  "/_nuxt/Poppins-ThinItalic.043226b0.ttf": {
    "type": "font/ttf",
    "etag": "\"2daa4-+4/MyiFVDnETX5K7r4ouihLJBGU\"",
    "mtime": "2023-05-12T09:30:33.776Z",
    "size": 187044,
    "path": "../public/_nuxt/Poppins-ThinItalic.043226b0.ttf"
  },
  "/_nuxt/register.36ff16f9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"841-1rAKHdd6WfYpcJD4t0bUJuSB+Zc\"",
    "mtime": "2023-05-12T09:30:33.956Z",
    "size": 2113,
    "path": "../public/_nuxt/register.36ff16f9.css"
  },
  "/_nuxt/register.794050ea.js": {
    "type": "application/javascript",
    "etag": "\"28fc-tUOZqUtyStNPDJdI+dqrz1K0H6A\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 10492,
    "path": "../public/_nuxt/register.794050ea.js"
  },
  "/_nuxt/useTranslate.8819d20e.js": {
    "type": "application/javascript",
    "etag": "\"a8-nqmk9dkKD1kpXayOQV5x8rauRLU\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 168,
    "path": "../public/_nuxt/useTranslate.8819d20e.js"
  },
  "/_nuxt/VSelect.074ef868.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"420-q1Aa5S2DvOluJh8/CfrcwlZw2TA\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 1056,
    "path": "../public/_nuxt/VSelect.074ef868.css"
  },
  "/_nuxt/VSelect.1c4ae724.js": {
    "type": "application/javascript",
    "etag": "\"5a5-vMvt0gpoRU3XRRowawgmjh1nZZg\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 1445,
    "path": "../public/_nuxt/VSelect.1c4ae724.js"
  },
  "/_nuxt/_id_.2cf36592.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2fe-GFcy52FlM/mC1/SDm9s/Vn0zAzw\"",
    "mtime": "2023-05-12T09:30:33.946Z",
    "size": 766,
    "path": "../public/_nuxt/_id_.2cf36592.css"
  },
  "/_nuxt/_id_.a69b87ed.js": {
    "type": "application/javascript",
    "etag": "\"6fb-PDkuEJcsKdw8Vm2hjakjDaLCH3Y\"",
    "mtime": "2023-05-12T09:30:33.916Z",
    "size": 1787,
    "path": "../public/_nuxt/_id_.a69b87ed.js"
  },
  "/_nuxt/_productId_.c9e1a422.js": {
    "type": "application/javascript",
    "etag": "\"39e-AfuU+GqPIRebu30pz6mBpJW4vsw\"",
    "mtime": "2023-05-12T09:30:33.926Z",
    "size": 926,
    "path": "../public/_nuxt/_productId_.c9e1a422.js"
  },
  "/our-product/5/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"e6a-PA5257E5d+OHvUl75cmCMek3c6g\"",
    "mtime": "2023-05-12T09:30:47.590Z",
    "size": 3690,
    "path": "../public/our-product/5/index.html"
  },
  "/our-product/4/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"e6a-PA5257E5d+OHvUl75cmCMek3c6g\"",
    "mtime": "2023-05-12T09:30:47.610Z",
    "size": 3690,
    "path": "../public/our-product/4/index.html"
  },
  "/our-product/6/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"e6a-PA5257E5d+OHvUl75cmCMek3c6g\"",
    "mtime": "2023-05-12T09:30:47.580Z",
    "size": 3690,
    "path": "../public/our-product/6/index.html"
  },
  "/our-product/custom-card/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"e6a-PA5257E5d+OHvUl75cmCMek3c6g\"",
    "mtime": "2023-05-12T09:30:47.560Z",
    "size": 3690,
    "path": "../public/our-product/custom-card/index.html"
  },
  "/our-product/digital-business-credit-card/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"e6a-PA5257E5d+OHvUl75cmCMek3c6g\"",
    "mtime": "2023-05-12T09:30:47.570Z",
    "size": 3690,
    "path": "../public/our-product/digital-business-credit-card/index.html"
  },
  "/our-product/dual-card/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"e6a-PA5257E5d+OHvUl75cmCMek3c6g\"",
    "mtime": "2023-05-12T09:30:47.560Z",
    "size": 3690,
    "path": "../public/our-product/dual-card/index.html"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_4FCDgO = () => import('./login.mjs');
const _lazy_oj2xhl = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/login', handler: _lazy_4FCDgO, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_oj2xhl, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_oj2xhl, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
