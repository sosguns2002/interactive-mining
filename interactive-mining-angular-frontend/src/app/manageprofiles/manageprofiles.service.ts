import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProfileData} from './profile-data';
import {Util} from '../util';
import {Observable} from 'rxjs/Observable';
import {ProfileMetadata} from './profile-metadata';
import {ExampleProfilesMetadata} from './example-profiles-metadata';
import {UsersMetadata} from './users-metadata';

@Injectable()
export class ManageprofilesService {

  private util: Util = new Util();

  private userId = '';
  private backendServerAddress = '';
  public isCommunityManager = 'false';

  private initServerHandshake = '/initialhandshake';
  private getusersProfilesUrl = '/getusersprofiles';
  private updateProfileStatusUrl = '/updateprofilestatus';
  private getSavedProfilesUrl = '/getuserprofiles';
  private downloadProfileUrl = '/downloadprofile';
  private DeleteuserProfileUrl = '/deleteuserprofile';
  private createNewProfileUrl = '/createnewprofile';
  private loadSavedProfileUrl = '/loaduserprofile';
  private getExampleProfilesUrl = '/getexampleprofiles';
  private loadExampleProfileUrl = '/loadexampleprofile';
  private uploadProfileUrl = '/uploadprofile';

  constructor(private http: HttpClient) {
    this.userId = this.util.getUserId();
    this.backendServerAddress = this.util.getBackendServerAddress();
    this.isCommunityManager = this.util.getIsCommunityManager();
  }

  initialServerHandshake(communityId: string): Observable<any> {
    return this.http.get(this.backendServerAddress + this.initServerHandshake + `?user=${this.userId}&communityId=${communityId}`)
      .catch(this.util.handleError);
  }


  getUsersProfiles(): Observable<UsersMetadata[]> {
    return this.http.get(this.backendServerAddress + this.getusersProfilesUrl + `?isinadministrators=${this.isCommunityManager}`)
      .map(data => data['profiles'])
      .catch(this.util.handleError);
  }

  updateProfileStatus(userId: string, profileId: string, status: string): Observable<any> {
    return this.http.post(this.backendServerAddress + this.updateProfileStatusUrl, {isinadministrators: this.isCommunityManager, user: userId, id: profileId, status: status})
      .catch(this.util.handleError);
  }

  downloadUserProfileAdmin(userId: string, profileId: string): Observable<any> {
    return this.http.post(this.backendServerAddress + this.downloadProfileUrl,
      {user: userId, id: profileId}, {responseType: 'blob'})
      .catch(this.util.handleError);
  }

  loadUserProfileAdmin(userId: string, profileId: string): Observable<ProfileData> {
    return this.http.post<ProfileData>(this.backendServerAddress + this.loadSavedProfileUrl, {user: userId, id: profileId})
      .catch(this.util.handleError);
  }

  downloadProfile(profileId: string): Observable<any> {
    return this.http.post(this.backendServerAddress + this.downloadProfileUrl,
      {user: this.userId, id: profileId}, {responseType: 'blob'})
      .catch(this.util.handleError);
  }

  deleteProfile(profileId: string): Observable<any> {
    return this.http.post(this.backendServerAddress + this.DeleteuserProfileUrl, {user: this.userId, id: profileId})
      .catch(this.util.handleError);
  }

  createNewProfile(): Observable<any> {
    return this.http.get(this.backendServerAddress + this.createNewProfileUrl + `?user=${this.userId}`)
      .catch(this.util.handleError);
  }

  loadSavedProfile(profileId: string): Observable<ProfileData> {
    return this.http.post<ProfileData>(this.backendServerAddress + this.loadSavedProfileUrl, {user: this.userId, id: profileId})
      .catch(this.util.handleError);
  }

  loadExampleProfile(name: string): Observable<ProfileData> {
    return this.http.post<ProfileData>(this.backendServerAddress + this.loadExampleProfileUrl, {user: this.userId, name: name})
      .catch(this.util.handleError);
  }

  uploadFile(file: File): Observable<ProfileData> {
    const formData: FormData = new FormData();
    formData.append('upload', file, file.name);
    formData.append('user', this.userId);
    const params = new HttpParams();
    const options = {
      headers: new HttpHeaders().set('Accept', 'application/json').delete('Content-Type'),
      params: params,
      reportProgress: true
    };
    return this.http.post<ProfileData>(this.backendServerAddress + this.uploadProfileUrl, formData, options)
      .catch(this.util.handleError);
  }

  getSavedProfiles(): Observable<ProfileMetadata[]> {
    return this.http.get(this.backendServerAddress + this.getSavedProfilesUrl + `?user=${this.userId}`)
      .map(data => data['profiles'])
      .catch(this.util.handleError);
  }

  getExampleProfiles(): Observable<ExampleProfilesMetadata[]> {
    return this.http.get(this.backendServerAddress + this.getExampleProfilesUrl)
      .map(data => data['profiles'])
      .catch(this.util.handleError);
  }

}
