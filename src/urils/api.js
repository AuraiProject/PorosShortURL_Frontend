const commonFetch = (url, settings) => values => {
  let paramStr = '';
  Object.keys(values).map(k => {
    if (values[k]) {
      paramStr += k + '=' + values[k] + '&';
    }
  });
  return fetch(url, {...{body: paramStr}, ...settings})
};

export const longToShort = commonFetch('/api/url', {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  })
});
export const shortToLong = commonFetch('/api/url', {
  method: "GET"
});