export class CustomError extends Error {
  private readonly nameError: string;
  private readonly messageError: string;

  constructor(nameError: string, messageError: string) {
    super(messageError);
    this.nameError = nameError;
    this.messageError = messageError;
  }

  public getNameError(): string {
    return this.nameError;
  }

  public getMessageError(): string {
    return this.messageError;
  }
}
