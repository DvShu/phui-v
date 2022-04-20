export interface FormRegistInput {
  error: (errMsg?: string) => void;
  value: () => string;
  isError: () => boolean;
}

// 注入的 key
/** 表单中注入的验证器的 key */
export const validatorKey = Symbol('PhFormValidator');
/** 表单中注册输入框的key */
export const formRegistKey = Symbol('PhFormRegist');
