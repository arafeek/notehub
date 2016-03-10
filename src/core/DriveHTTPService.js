import { Injectable, Inject } from 'ng-forward';

@Inject('$http')
@Injectable()
export default class DriveHTTPService {
  constructor($http) {
    this.$http = $http;
  }

  fetchFileContentsById(fileId) {
    const { $http } = this;
    return $http.get(`https://www.googleapis.com/drive/v2/files/${fileId}?alt=media`);
  }
}