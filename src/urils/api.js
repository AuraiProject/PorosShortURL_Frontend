const toParamStr = (values) => {
  let paramStr = '';
  Object.keys(values).map(k => {
    if (values[k]) {
      paramStr += k + '=' + values[k] + '&';
    }
  });
  return paramStr;
};

const commonPostFetch = (url, settings) => values => {
  let paramStr = toParamStr(values);
  return fetch(url, {...{body: paramStr}, ...settings})
};

export const longToShort = commonPostFetch('/api/url', {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  })
});


export const shortToLong = (values, password) => {
  let paramStr = toParamStr(values);
  return fetch('/api/url?' + paramStr, {
    method: "GET",
    headers: new Headers({
      "Authentication": "Basic " + (password ? btoa(password) : '')
    })
  })
};