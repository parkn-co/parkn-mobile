// @flow
import _ from 'lodash';
import {API_URL, API_VERSION} from '../config';

class ApiBase {
  apiUrl: string;
  headers: Object;

  constructor() {
    this.apiUrl = `http://${API_URL}/api/${API_VERSION}/`;

    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  get(path: string, queryParams: Object = {}) {
    let url = path;
    if (queryParams) {
      url = `${url}?${this.buildParams(queryParams)}`
    }

    return this.request(url, {method: 'GET'});
  }

  authGet(getState: Function, path: string, queryParams: Object = {}) {
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

  post(path: string, params: Object = {}) {
    const config = _.assign({}, {
      method: 'POST',
      headers: new Headers(this.headers),
      body: this.buildParams(params),
    });

    return this.request(path, config);
  }

  authPost(getState: Function, path: string, params: Object = {}) {
    const config = _.assign({}, {
      method: 'POST',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
      body: this.buildParams(params),
    });

    return this.request(path, config);
  }

  authPut(getState: Function, path: string, params: Object = {}) {
    const config = _.assign({}, {
      method: 'PUT',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
      body: this.buildParams(params),
    });

    return this.request(path, config);
  }

  authDelete(getState: Function, path: string) {
    const config = _.assign({}, {
      method: 'DELETE',
      headers: new Headers(_.assign(this.headers, {
        'Authorization': this.getTokenFromState(getState),
      })),
    });

    return this.request(path, config);
  }

  upload(getState: Function, path: string, data: any, callback: any) {
    var form = new FormData();

    _.keys(data).forEach(key => {
      form.append(key, data[key]);
    });

    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState == 4 /* XMLHttpRequest.DONE */) {
        callback(request);
      }
    }

    request.open("POST", this.describeEndpoint(path));
    request.setRequestHeader('Authorization', this.getTokenFromState(getState));
    request.send(form);
  }

  describeEndpoint(path: string) {
    return `${this.apiUrl}${path}/`;
  }

  request(path: string, config: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let status;

      fetch(this.describeEndpoint(path), config)
        .then(res => {
          status = res.status;

          if (status === 404) {
            return reject(res);
          }

          return res.json();
        })
        .then(res => {
          if (!res) {
            return;
          }

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

  buildParams(params: Object): string {
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
  generateFormBoundary(): string {
    let boundary = 'boundary=--------------------------';

    for (let i = 0; i < 24; i++) {
      boundary += Math.floor(Math.random() * 10).toString(16);
    }

    return boundary;
  }

  getTokenFromState(getState: Function): string {
    const {authentication: {token}} = getState();
    return token || '';
  }
}

export default new ApiBase();
