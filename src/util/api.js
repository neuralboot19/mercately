import * as APILIST from './api_url';
import * as globals from './globals';

export const buildHeader = (headerParams = {}) => {
  let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + globals.access_token || ''
  }
  Object.assign(header, headerParams);
  return header; 
}

export const API = {
  login: (onResponse, data, isHeaderRequired) => {
    request(onResponse, data, 'POST', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.LOGIN, buildHeader());
  },
  signOut: (onResponse, {}, isHeaderRequired) => {
    request(onResponse, {}, 'DELETE', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.SIGNOUT, buildHeader());
  },
}

async function request(onResponse, data, type, returnType, isHeaderRequired, featureURL, secureRequest) {
  let response = '';
  console.log("featureURL >>> " + featureURL);
  console.log("secureRequest " + JSON.stringify(secureRequest));
  console.log("data >>> " + JSON.stringify(data));
  console.log("returnType " + returnType);
  console.log("isHeaderRequired " + isHeaderRequired);
  console.log("type " + type);

  try {
    if (type === 'GET') {
      if (isHeaderRequired) {
        response = await fetch(featureURL, {
          method: type,
          headers: secureRequest
        });
      }
      else {
        response = await fetch(featureURL, {
          method: type,
        });
      }
    } else {
      response = await fetch(featureURL, {
        method: type,
        headers: secureRequest,
        body: JSON.stringify(data)
      });
    }
    let responseHEADERS = await response.headers;
    let responseJSON = await response.json();
    if (response.status == 200) {
      onResponse.success(responseJSON, responseHEADERS);
    } else {
      onResponse.error(responseJSON, responseHEADERS);
    }
    if (onResponse.complete) {
      onResponse.complete();
    }
  } catch (error) {
    console.log("onResponse catch error " + error);
  }
}