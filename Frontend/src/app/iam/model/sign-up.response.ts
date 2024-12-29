/**
 * Model for the response of the sign-up endpoint
 */
export class SignUpResponse {
  public id: number;
  public username: string;


  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;

  }
}
