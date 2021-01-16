/*
 * @Author: abc
 * @Date: 2020-12-14 16:04:07
 * @LastEditors: abc
 * @LastEditTime: 2020-12-15 17:37:24
 * @Description:
 */
module.exports = {
  init: function() {
    console.log(abcdbinabcd...');
    // bing map key
    const bingUesrKey =
      'ApN1XkT2A0xYVCMN0mihGQWzQ4btN3v171jSV0BvrBRmsFDWe7pVnKu3o-tgXjox';
    const lang = 'en-US';
    const BingMap_URL = `http://www.bing.com/api/maps/mapcontrol?setLang=${lang}&key=${bingUesrKey}`;
    return new Promise((resolve, reject) => {
      if (typeof Microsoft !== 'undefined') {
        // eslint-disable-next-line no-undef
        resolve(Microsoft);
        return true;
      }

      //abcdscripabcd
      let scriptNode = document.createElement('script');
      scriptNode.setAttribute('type', 'text/javascript');
      scriptNode.setAttribute('src', BingMap_URL);
      document.body.appendChild(scriptNode);

      //abcd
      let timeout = 0;
      let interval = setInterval(() => {
        //abcd1abcd
        if (timeout >= 20) {
          reject();
          clearInterval(interval);
          console.error('binabcd...');
        }
        //abcd
        if (typeof Microsoft !== 'undefined') {
          // eslint-disable-next-line no-undef
          resolve(Microsoft);
          clearInterval(interval);
          console.log('binabcd...');
        }
        timeout += 1;
      }, 500);
    });
  }
};
