/**
 * Model class for SignUpRequest
 */
export class SignUpRequest {
  public username: string;
  public password: string;


  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;

  }
}