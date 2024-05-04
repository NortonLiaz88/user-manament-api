export class EntityValidationError extends Error {
  constructor(
    public readonly location: string,
    public readonly code: string,
    public readonly message: string,
    public readonly field: string,
    public readonly value: any,
  ) {
    super();
  }
}
