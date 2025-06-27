'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var SETTINGS = {
    totalUptime: 0,
    lastLoad: Date.now(),
    currentSessionDuration: 0,
    showTotalUptimeInStatusBar: false,
    displayStaringTimeAsHumanString: true,
    staringText: 'You have been staring at your vault for ',
    totalStaringText: 'Your total staring time in this vault is ',
    pausedText: 'Your staring counter is paused'
};
var YouHaveBeenStaring = /** @class */ (function (_super) {
    __extends(YouHaveBeenStaring, _super);
    function YouHaveBeenStaring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YouHaveBeenStaring.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.settings.lastLoad = Date.now();
                        this.settings.currentSessionDuration = 0;
                        this.counterActive = true;
                        this.staringTimeStatusBar = this.addStatusBarItem();
                        this.totalStaringTimeStatusBar = this.addStatusBarItem();
                        this.registerInterval(window.setInterval(function () {
                            _this.showTimeSinceLoad(),
                                _this.showTotalStaringTime(),
                                _this.settings.totalUptime += _this.counterActive ? 1000 : 0,
                                _this.settings.currentSessionDuration += _this.counterActive ? 1000 : 0;
                        }, 1000));
                        // Save every 10 minutes
                        this.registerInterval(window.setInterval(function () {
                            _this.saveSettings();
                        }, 600000));
                        this.addSettingTab(new YouHaveBeenStaringSettingsTab(this.app, this));
                        this.addRibbonIcon('any-key', 'Start/stop staring counter', function () {
                            _this.counterActive = !_this.counterActive;
                            new obsidian.Notice('Turning staring counter ' + (_this.counterActive ? 'on' : 'off'));
                            _this.saveSettings();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    YouHaveBeenStaring.prototype.onunload = function () {
        this.saveSettings();
    };
    YouHaveBeenStaring.prototype.showTimeSinceLoad = function () {
        if (this.settings.lastLoad && this.counterActive) {
            var moment = window.moment;
            var staringTime = moment.duration(this.settings.currentSessionDuration, 'milliseconds').humanize();
            this.staringTimeStatusBar.setText(this.settings.staringText + ("" + staringTime));
        }
        if (!this.counterActive) {
            this.staringTimeStatusBar.setText(this.settings.pausedText);
        }
    };
    YouHaveBeenStaring.prototype.showTotalStaringTime = function () {
        if (this.settings.showTotalUptimeInStatusBar && this.settings.totalUptime > 0) {
            var moment = window.moment;
            var totalStaringTime = this.settings.displayStaringTimeAsHumanString
                ? moment.duration(this.settings.totalUptime, 'milliseconds').humanize()
                : moment.duration(this.settings.totalUptime, 'milliseconds').hours() + ':' + moment.duration(this.settings.totalUptime, 'milliseconds').minutes();
            this.totalStaringTimeStatusBar.setText(this.settings.totalStaringText + ("" + totalStaringTime));
        }
    };
    YouHaveBeenStaring.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    YouHaveBeenStaring.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return YouHaveBeenStaring;
}(obsidian.Plugin));
var YouHaveBeenStaringSettingsTab = /** @class */ (function (_super) {
    __extends(YouHaveBeenStaringSettingsTab, _super);
    function YouHaveBeenStaringSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    YouHaveBeenStaringSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h3', { text: 'YouHaveBeenStaring settings' });
        new obsidian.Setting(containerEl)
            .setName('Show total staring duration')
            .setDesc('Displays the total duration you have been staring on your vault (well at least when this plugin was able to measure it).')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.showTotalUptimeInStatusBar)
                .onChange(function (value) {
                _this.plugin.settings.showTotalUptimeInStatusBar = value;
                if (!value) {
                    _this.plugin.totalStaringTimeStatusBar.empty();
                }
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Display total recorded staring time as human readable')
            .setDesc('The recorded staring time is shown as text, such as \'10 hours\'. Turning this off will show the total recorded time in HH:mm fashion.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.displayStaringTimeAsHumanString)
                .onChange(function (value) {
                _this.plugin.settings.displayStaringTimeAsHumanString = value;
                _this.plugin.showTotalStaringTime();
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Status bar text of staring time')
            .setDesc('Overrides the status bar text displaying your staring time.')
            .addTextArea(function (text) {
            return text
                .setValue(_this.plugin.settings.staringText)
                .setPlaceholder('You have been staring at your vault for ')
                .onChange(function (value) {
                _this.plugin.settings.staringText = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Status bar text of total staring time')
            .setDesc('Overrides the status bar text displaying your total staring time for this vault.')
            .addTextArea(function (text) {
            return text
                .setValue(_this.plugin.settings.totalStaringText)
                .setPlaceholder('Your total staring time in this vault is ')
                .onChange(function (value) {
                _this.plugin.settings.totalStaringText = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Status bar text when staring counter is paused')
            .setDesc('Overrides the status bar text shown when you disabled the staring time counting.')
            .addTextArea(function (text) {
            return text
                .setValue(_this.plugin.settings.pausedText)
                .setPlaceholder('Your staring counter is paused')
                .onChange(function (value) {
                _this.plugin.settings.pausedText = value;
                _this.plugin.saveSettings();
            });
        });
    };
    return YouHaveBeenStaringSettingsTab;
}(obsidian.PluginSettingTab));

module.exports = YouHaveBeenStaring;


/* nosourcemap */