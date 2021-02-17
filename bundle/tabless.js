var Tabless;(()=>{"use strict";var e={607:function(e,t,a){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var n=a(606),o=a(341),l=a(640),i=a(380),s=function(){function e(e,t,a){var r=this;void 0===a&&(a={}),this.config={addOrdinalNumber:!1,ordinalHeader:"No.",ordinalColumnClassName:"ordinal",orderBy:void 0,descending:!1,headerless:!1},this.renderWay=function(e){return null},this.render=function(){var e=r.columnsConfig,t=r.config,a=r.data;if(void 0!==r.config.orderBy){var i=r.config.orderBy;e.some((function(e){return e.columnIndex===i}))&&(a=n.sortData(a,i),r.config.descending&&(a=a.reverse()))}var s=l.generateHeaders(e,t),u=o.generateTableBody(e,a,t);return t.headerless||u.unshift(s),r.renderWay(u)},this.columnsConfig=e,this.data=i.removeInvalidElements(t),this.setConfig(a)}return e.prototype.setConfig=function(e){this.config=r(r({},this.config),e)},e.prototype.addRow=function(e,t){void 0===t&&(t=!1),i.isObjectValid(e)&&(t?this.data.unshift(e):this.data.push(e))},e.prototype.removeRow=function(e){isNaN(e)||e>=0&&e<this.data.length&&this.data.slice(e,1)},e}();t.default=s},125:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createCellFromRawData=t.createDataCell=void 0;var r=a(380);t.createDataCell=function(e,a){var n,o=a.columnIndex,l=a.columnClassName,i=a.columnFormat,s=null!==(n=e[o])&&void 0!==n?n:"",u=null!=l?l:"",c=t.createCellFromRawData(s,u);return i&&r.isFunction(i)&&(c.value=i(c.value)),c},t.createCellFromRawData=function(e,t){return{value:null!=e?e:"",className:null!=t?t:""}}},606:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sortData=void 0,t.sortData=function(e,t){return e.sort((function(e,a){var r,n,o=null!==(r=e[t])&&void 0!==r?r:"",l=null!==(n=a[t])&&void 0!==n?n:"";return isNaN(o)||isNaN(l)?o.localeCompare?o.localeCompare(l.toString()):l.localeCompare?l.localeCompare(o.toString()):0:(o=parseFloat(o))-(l=parseFloat(l))}))}},341:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateTableBody=void 0;var r=a(125),n=a(380);t.generateTableBody=function(e,t,a){var o=[],l=1;return t.forEach((function(t,i){var s;if(n.isObjectValid(t)){var u={absoluteId:i,cells:[]};if(a.addOrdinalNumber){var c=l;l++;var d=null!==(s=a.ordinalColumnClassName)&&void 0!==s?s:"ordinal",f=r.createCellFromRawData(c.toString(),d);u.cells.push(f)}e.forEach((function(e){var a=r.createDataCell(t,e);u.cells.push(a)})),o.push(u)}})),o}},640:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateHeaders=void 0;var r=a(125);t.generateHeaders=function(e,t){var a,n,o={absoluteId:-1,cells:[]};if(t.addOrdinalNumber){var l=null!==(a=t.ordinalHeader)&&void 0!==a?a:"No.",i=null!==(n=t.ordinalColumnClassName)&&void 0!==n?n:"ordinal",s=r.createCellFromRawData(l,i);o.cells.push(s)}return e.forEach((function(e){var t=e.columnName,a=e.columnClassName,n=r.createCellFromRawData(t,a);o.cells.push(n)})),o}},380:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.removeInvalidElements=t.isObjectValid=t.isObjectEmpty=t.isFunction=void 0,t.isFunction=function(e){return!!(e&&e.constructor&&e.call&&e.apply)},t.isObjectEmpty=function(e){return e&&0===Object.keys(e).length&&e.constructor===Object},t.isObjectValid=function(e){return e&&!t.isObjectEmpty(e)&&"object"==typeof e},t.removeInvalidElements=function(e){return e.filter((function(e){return t.isObjectValid(e)}))}}},t={},a=function a(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,a),n.exports}(607);Tabless=a.default})();