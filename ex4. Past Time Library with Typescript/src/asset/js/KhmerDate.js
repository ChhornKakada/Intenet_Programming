"use strict";
exports.__esModule = true;
exports.KhmerDate = void 0;
var KhmerDate = /** @class */ (function () {
  function KhmerDate(date) {
    this._date = date;
  }
  KhmerDate.prototype.getDate = function () {
    return this._date;
  };
  KhmerDate.prototype.getLabel = function () {
    var now = new Date();
    var dateSecond = Math.floor((now.getTime() - this._date.getTime()) / 1000);
    var label = "ពេលក្រោយ";
    if (dateSecond >= 0) {
      label = "មុននេះបន្តិច";
      if (dateSecond / 60 > 1) {
        label = "".concat(Math.floor(dateSecond / 60), " \u1793\u17B6\u1791\u17B8\u1798\u17BB\u1793");
      }
      if (dateSecond / 3600 > 1) {
        label = "".concat(Math.floor(dateSecond / 3600), " \u1798\u17C9\u17C4\u1784\u1798\u17BB\u1793");
      }
      if (dateSecond / 86400 > 1) {
        label = "".concat(Math.floor(dateSecond / 86400), " \u1790\u17D2\u1784\u17C3\u1798\u17BB\u1793");
      }
      if (dateSecond / 604800 > 1) {
        label = "".concat(Math.floor(dateSecond / 604800), "\u179F\u1794\u17D2\u178F\u17B6\u17A0\u17CD\u1798\u17BB\u1793");
      }
      if (dateSecond / 2629440 > 1) {
        label = "".concat(Math.floor(dateSecond / 2629440), "\u1781\u17C2\u1798\u17BB\u1793");
      }
    }
    else {
      dateSecond = Math.floor((this._date.getTime() - now.getTime()) / 1000);
      label = "ក្រោយនេះបន្តិច";
      if (dateSecond / 60 > 1) {
        label = "".concat(Math.floor(dateSecond / 60), " \u1793\u17B6\u1791\u17B8\u1780\u17D2\u179A\u17C4\u1799");
      }
      if (dateSecond / 3600 > 1) {
        label = "".concat(Math.floor(dateSecond / 3600), " \u1798\u17C9\u17C4\u1784\u1780\u17D2\u179A\u17C4\u1799");
      }
      if (dateSecond / 86400 > 1) {
        label = "".concat(Math.floor(dateSecond / 86400), " \u1790\u17D2\u1784\u17C3\u1780\u17D2\u179A\u17C4\u1799");
      }
      if (dateSecond / 604800 > 1) {
        label = "".concat(Math.floor(dateSecond / 604800), "\u179F\u1794\u17D2\u178F\u17B6\u17A0\u17CD\u1780\u17D2\u179A\u17C4\u1799");
      }
      if (dateSecond / 2629440 > 1) {
        label = "".concat(Math.floor(dateSecond / 2629440), "\u1781\u17C2\u1780\u17D2\u179A\u17C4\u1799");
      }
    }
    return label;
  };
  return KhmerDate;
}());
exports.KhmerDate = KhmerDate;
