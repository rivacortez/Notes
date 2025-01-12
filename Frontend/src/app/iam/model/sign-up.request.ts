/**
 * Model class for SignUpRequest
 */
export class SignUpRequest {
  username: string;
  password: string;
  role: string;

  constructor(username: string, password: string, role: string = 'ROLE_USER') {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
