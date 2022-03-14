export interface Database<Type> {
  getAll(): Type[];

  getOne(any: Type): Type;

  create(any: Type): Type;

  delete(any: Type): Type;
}
