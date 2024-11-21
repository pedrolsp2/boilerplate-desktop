export enum Operators {
  EQUALS = 'EQUALS',
  LIKE = 'LIKE',
  BETWEEN = 'BETWEEN',
  NOT_NULL = 'NOT_NULL',
  NULL = 'IS_NULL',
  DIFFERENT = 'DIFFERENT',
  ALL = "REGEXP('.*')",
}

export type Joiners = 'OR' | 'AND';

export interface BaseFilter<T> {
  CAMPO: keyof T;
}

interface BetweenFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.BETWEEN;
  VALOR: string[] | null;
}

export interface LikeFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.LIKE;
  VALOR: string | number | null;
}

interface EqualsFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.EQUALS;
  VALOR: string | number | null;
}

interface DifferentFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.DIFFERENT;
  VALOR: string | number | null;
}

interface NotNullFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.NOT_NULL;
}

interface NullFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.NULL;
}

interface AllFilter<T> extends BaseFilter<T> {
  OPERADOR: Operators.ALL;
}

export interface AndFilter<T> {
  AND: FilterTypes<T>[];
}

export interface OrFilter<T> {
  OR: FilterTypes<T>[];
}

export type FilterTypes<T> =
  | BetweenFilter<T>
  | LikeFilter<T>
  | EqualsFilter<T>
  | NotNullFilter<T>
  | NullFilter<T>
  | DifferentFilter<T>
  | AllFilter<T>
  | AndFilter<T>
  | OrFilter<T>;

export type Filter<T> = OrFilter<T> | AndFilter<T> | FilterTypes<T>;
