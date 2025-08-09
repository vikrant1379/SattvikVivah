
export type ValidationError = {
  field: string;
  message: string;
};

export type FormState<T> = {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isDirty: boolean;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type MultiSelectOption = SelectOption;
