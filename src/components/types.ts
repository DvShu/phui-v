/** 表单中获取当前字段验证信息 */
export const formItemInfo = Symbol('PhFormItemRequired');
/** 表单中 input 框数据验证的时机 */
export const formValidTrigger = Symbol('PhFormValidTrigger');
/** 表单中 form-item 提供的数据验证器 */
export const formItemValidFunc = Symbol('PhFormItemValidFunc');
/** 表单中 form 提供的验证数据的函数 */
export const formValidKeyFunc = Symbol('PhFormValidKeyFunc');
/** 表单中 form 验证错误 */
export const formValidError = Symbol('PhFormValidError');
/** Form表单实例 */
export type FormInstance = {
  /** 重置表单错误 */
  resetErrors: () => void;
  /** 进行数据验证 */
  validate: () => Promise<boolean>;
};
