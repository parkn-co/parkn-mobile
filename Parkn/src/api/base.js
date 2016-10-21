import _ from 'lodash';
import {API_URL, API_VERSION} from '../config';

class ApiBase {
  constructor() {
    this.apiUrl = `http://${API_URL}/api/${API_VERSION}/`;

    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  get(path, queryParams = {}) {
    let url = path;
    if (queryParams) {
      url = `${url}?${this.buildParams(queryParams)}`
    }

    return this.request(url, {method: 'GET'});
  }

  authGet(getState, path, queryParams = {}) {
    let url = path;
    if (!_.isEmpty(queryParams)) {
      url = `${url}?${this.buildParams(queryParams)}`
    }

    return this.request(url, {
      method: 'GET',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
    });
  }

  post(path, params = {}) {
    const config = _.assign({}, {
      method: 'POST',
      headers: new Headers(this.headers),
      body: this.buildParams(params),
    });

    return this.request(path, config);
  }

  authPost(getState, path, params = {}) {
    const config = _.assign({}, {
      method: 'POST',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
      body: this.buildParams(params),
    });

    return this.request(path, config);
  }

  authPut(getState, path, params = {}) {
    const config = _.assign({}, {
      method: 'PUT',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
      body: this.buildParams(params),
    });

    return this.request(path, config);
  }

  authDelete(getState, path) {
    const config = _.assign({}, {
      method: 'DELETE',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
    });

    return this.request(path, config);
  }

  upload(getState, path, data, callback) {
    return this.storage.get('token').then(token => {
      var form = new FormData();

      _.keys(data).forEach(key => {
        form.append(key, data[key]);
      });

      var request = new XMLHttpRequest();

      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE) {
          callback(request);
        }
      }

      request.open("POST", this.describeEndpoint(path));
      request.setRequestHeader('Authorization', this.storage.retrieve('token'));
      request.send(form);
    });
  }

  describeEndpoint(path) {
    return `${this.apiUrl}${path}`;
  }

  request(path, config) {
    return new Promise((resolve, reject) => {
      let status;

      fetch(this.describeEndpoint(path), config)
        .then(res => {
          status = res.status;
          
          return res.json();
        })
        .then(res => {
          if (res.success) {
            return resolve(res.data)
          }

          const errors = !res.errors ?
            res :
            _.mapKeys(res.errors, (val, key) => _.camelCase(key));

          reject({...errors, status});
        })
        .catch(err => console.error(err));
    });
  }

  buildParams(params) {
    let data = '';

    _.forIn(params, function(value, key) {
      if (data === '') {
        data = `${key}=${params[key]}`;
      } else {
        data = `${data}&${key}=${params[key]}`;
      }
    });

    return data;
  }

  // https://github.com/form-data/form-data/blob/master/lib/form_data.js#L288
  generateFormBoundary() {
    let boundary = 'boundary=--------------------------';

    for (let i = 0; i < 24; i++) {
      boundary += Math.floor(Math.random() * 10).toString(16);
    }

    return boundary;
  }

  getTokenFromState(getState) {
    const {authentication: {token}} = getState();
    return token || '';
  }
}

export default new ApiBase();
