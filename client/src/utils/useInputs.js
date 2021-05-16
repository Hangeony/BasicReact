import { useReducer, useCallback } from "react";

function reducer(state, action) {
  if (!action) {
    const initState = {};
    Object.keys(state).forEach((key) => {
      initState[key] = "";
    });
    return initState;
  }

  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(defaultValues) {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const onChange = useCallback((e) => {
    dispatch({
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const onReset = useCallback(() => {
    dispatch(null);
  }, []);

  return [state, onChange, onReset, dispatch];
}
