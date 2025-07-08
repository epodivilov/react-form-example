import { useCallback, useEffect, useReducer, useRef } from "react";

export type RequestStatus = "idle" | "pending" | "success" | "error";

interface AsyncState<T, E = Error> {
  result: T | null;
  error: E | null;
  status: RequestStatus;
}

type AsyncAction<T, E = Error> =
  | { type: "START" }
  | { type: "SUCCESS"; payload: T }
  | { type: "ERROR"; payload: E }
  | { type: "RESET" };

function asyncReducer<T, E = Error>(state: AsyncState<T, E>, action: AsyncAction<T, E>): AsyncState<T, E> {
  switch (action.type) {
    case "START":
      return {
        result: null,
        error: null,
        status: "pending",
      };
    case "SUCCESS":
      return {
        result: action.payload,
        error: null,
        status: "success",
      };
    case "ERROR":
      return {
        result: null,
        error: action.payload,
        status: "error",
      };
    case "RESET":
      return {
        result: null,
        error: null,
        status: "idle",
      };
    default:
      return state;
  }
}

export function useAsync<T, A extends unknown[], E = Error>(operation: (...args: A) => Promise<T>) {
  const [state, dispatch] = useReducer(asyncReducer<T, E>, {
    result: null,
    error: null,
    status: "idle",
  });

  const operationRef = useRef(operation);

  useEffect(() => {
    operationRef.current = operation;
  }, [operation]);

  const execute = useCallback(async (...args: A) => {
    dispatch({ type: "START" });

    try {
      const response = await operationRef.current(...args);
      dispatch({ type: "SUCCESS", payload: response });
      return response;
    } catch (err) {
      dispatch({ type: "ERROR", payload: err as E });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    execute,
    result: state.result,
    error: state.error,
    status: state.status,
    reset,
  };
}
