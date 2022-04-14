export interface FormRegistInput {
  error: (errMsg?: string) => void;
  value: () => string;
  isError: () => boolean;
}
