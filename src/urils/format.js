import moment from 'moment';


export const timeToPythonTimestamp = date => {
  return Math.round(moment(date).valueOf() / 1000)
};

export const pythonTimestampToJsDate = timestamp => {
  return new Date(timestamp * 1000);
};

export const formatResult = resJson => {
  if (resJson.created_timestamp) {
    resJson.created_time = pythonTimestampToJsDate(resJson.created_timestamp).toLocaleDateString();
  }
  if (resJson.expired_timestamp) {
    resJson.expired_time = pythonTimestampToJsDate(resJson.expired_timestamp).toLocaleDateString();
  }
  delete resJson.created_timestamp;
  delete resJson.expired_timestamp;
  // resJson.password will always be empty.
  delete resJson.password;
  return resJson;
};