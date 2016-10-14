export const SET_FORM_VALUES = 'SET_FORM_VALUES';
export function setFormValues(values) {
  return {
    type: SET_FORM_VALUES,
    payload: values,
  };
}

export function authenticateWithValues(values) {
  return {
    type: SET_FORM_VALUES,
    payload: values
  };
}
