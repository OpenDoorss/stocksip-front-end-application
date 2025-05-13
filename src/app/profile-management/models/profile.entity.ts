export class Profile {
  constructor(
    public id: string | null = null,
    public name: string = '',
    public email: string = '',
    public businessName: string = '',
    public phone: string = '',
    public password: string | null = null
  ) {}
}
