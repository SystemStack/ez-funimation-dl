/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/access.ts":
/*!***********************!*\
  !*** ./src/access.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.GetAccessToken = void 0;\r\nconst prompts_1 = __importDefault(__webpack_require__(/*! prompts */ \"prompts\"));\r\nconst promises_1 = __webpack_require__(/*! fs/promises */ \"fs/promises\");\r\nconst service_1 = __webpack_require__(/*! ./service */ \"./src/service.ts\");\r\nconst tokenFile = '.accesstoken';\r\nfunction _readTokenFile() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        return yield promises_1.readFile(tokenFile, 'utf8');\r\n    });\r\n}\r\nfunction _writeTokenFile(token) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        return yield promises_1.writeFile(tokenFile, token);\r\n    });\r\n}\r\nfunction _login() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const questions = [{\r\n                type: 'text',\r\n                name: 'username',\r\n                message: 'Funimation Username (Never stored)'\r\n            }, {\r\n                type: 'password',\r\n                name: 'password',\r\n                message: 'Funimation Password (Never stored)'\r\n            }];\r\n        let userCred = yield prompts_1.default(questions);\r\n        return service_1.Login(userCred);\r\n    });\r\n}\r\nfunction GetAccessToken() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let token = yield _readTokenFile();\r\n        if (token === '') {\r\n            token = yield _login();\r\n            yield _writeTokenFile(token);\r\n        }\r\n        return token;\r\n    });\r\n}\r\nexports.GetAccessToken = GetAccessToken;\r\n\n\n//# sourceURL=webpack://ez-funimation-dl/./src/access.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.userAgent = exports.SOURCE_API = void 0;\r\nexports.SOURCE_API = 'https://prod-api-funimationnow.dadcdigital.com/api/';\r\nexports.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59';\r\n\n\n//# sourceURL=webpack://ez-funimation-dl/./src/config.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst search_1 = __webpack_require__(/*! ./search */ \"./src/search.ts\");\r\nconst run = () => __awaiter(void 0, void 0, void 0, function* () {\r\n    while (true) {\r\n        let idSearchResult = yield search_1.IdSearch();\r\n        let idSelectResult = yield search_1.SelectId(idSearchResult);\r\n        let episodeResult = yield search_1.SelectEpisodes(idSelectResult);\r\n        console.log(episodeResult);\r\n    }\r\n});\r\nprocess.on('SIGTERM', () => {\r\n    process.exit(1);\r\n});\r\nrun();\r\n\n\n//# sourceURL=webpack://ez-funimation-dl/./src/index.ts?");

/***/ }),

/***/ "./src/search.ts":
/*!***********************!*\
  !*** ./src/search.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.SelectEpisodes = exports.SelectId = exports.IdSearch = void 0;\r\nconst prompts_1 = __importDefault(__webpack_require__(/*! prompts */ \"prompts\"));\r\nconst service_1 = __webpack_require__(/*! ./service */ \"./src/service.ts\");\r\nfunction _idSearch() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const questions = [{\r\n                type: 'text',\r\n                name: 'title',\r\n                message: 'Search Funimation🔎'\r\n            }];\r\n        let answer = yield prompts_1.default(questions);\r\n        return service_1.QueryIds(answer);\r\n    });\r\n}\r\nfunction IdSearch() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let result = yield _idSearch();\r\n        if (result.length === 0) {\r\n            console.log(\"No results\");\r\n        }\r\n        return result;\r\n    });\r\n}\r\nexports.IdSearch = IdSearch;\r\nfunction _selectId(ids) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const question = {\r\n            type: 'autocomplete',\r\n            name: 'animeId',\r\n            message: 'Which one is right? (autocomplete or arrow keys)',\r\n            choices: ids.map((e) => {\r\n                return {\r\n                    title: e.title,\r\n                    description: e.description,\r\n                    value: e.id\r\n                };\r\n            })\r\n        };\r\n        let result = yield prompts_1.default(question);\r\n        return result.animeId;\r\n    });\r\n}\r\nfunction SelectId(ids) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        return yield _selectId(ids);\r\n    });\r\n}\r\nexports.SelectId = SelectId;\r\nfunction _selectEpisodes(id) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        // const question: PromptObject = {\r\n        //   type: 'autocomplete',\r\n        //   name: 'animeId',\r\n        //   message: 'Which one is right? (autocomplete or arrow keys)',\r\n        //   choices: ids.map((e) => {\r\n        //       return {\r\n        //         title: e.title,\r\n        //         description: e.description,\r\n        //         value: e.id\r\n        //       };\r\n        //   })\r\n        // };\r\n        // let result = await prompts(question);\r\n        // return result.animeId;\r\n    });\r\n}\r\nfunction SelectEpisodes(id) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        return yield _selectEpisodes();\r\n    });\r\n}\r\nexports.SelectEpisodes = SelectEpisodes;\r\n\n\n//# sourceURL=webpack://ez-funimation-dl/./src/search.ts?");

/***/ }),

/***/ "./src/service.ts":
/*!************************!*\
  !*** ./src/service.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.QueryAnime = exports.QueryIds = exports.Login = void 0;\r\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\r\nconst access_1 = __webpack_require__(/*! ./access */ \"./src/access.ts\");\r\nconst fetch = __webpack_require__(/*! node-fetch */ \"node-fetch\");\r\nconst loginRoute = 'auth/login/';\r\nconst historyRoute = 'source/funimation/history/';\r\nfunction Login(creds) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        return fetch(`${config_1.SOURCE_API}auth/login/`, {\r\n            method: 'POST',\r\n            body: JSON.stringify(creds),\r\n            headers: { 'user-agent': config_1.userAgent },\r\n            proxy: true\r\n        })\r\n            .then(function (res) {\r\n            return res.json();\r\n        })\r\n            .then(function (json) {\r\n            return json.token;\r\n        })\r\n            .catch(function (err) {\r\n            return err;\r\n        });\r\n    });\r\n}\r\nexports.Login = Login;\r\nfunction QueryIds(query) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let authHeader = GetAuthHeader();\r\n        return fetch(`${config_1.SOURCE_API}source/funimation/search/?q=${query.title}`, {\r\n            method: 'GET',\r\n            proxy: true,\r\n            headers: {\r\n                'user-agent': config_1.userAgent,\r\n                'Authorization': GetAuthHeader()\r\n            },\r\n        }).then(function (res) {\r\n            return res.json();\r\n        }).then(function (json) {\r\n            return json.items.hits;\r\n        }).catch(function (err) {\r\n            return err;\r\n        });\r\n    });\r\n}\r\nexports.QueryIds = QueryIds;\r\nfunction QueryAnime(query) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let authHeader = GetAuthHeader();\r\n        return fetch(`${config_1.SOURCE_API}/source/catalog/title/${query}`, {\r\n            method: 'GET',\r\n            proxy: true,\r\n            headers: {\r\n                'user-agent': config_1.userAgent,\r\n                'Authorization': authHeader\r\n            },\r\n        }).then(function (res) {\r\n            return res.json();\r\n        }).then(function (json) {\r\n            return json.items.hits;\r\n        }).catch(function (err) {\r\n            return err;\r\n        });\r\n    });\r\n}\r\nexports.QueryAnime = QueryAnime;\r\nfunction GetAuthHeader() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let token = yield access_1.GetAccessToken();\r\n        return `Token ${token}`;\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://ez-funimation-dl/./src/service.ts?");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");;

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");;

/***/ }),

/***/ "prompts":
/*!**************************!*\
  !*** external "prompts" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("prompts");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	var __webpack_export_target__ = this;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;