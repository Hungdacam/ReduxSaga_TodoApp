export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';

export const fetchTodosRequest = () => ({ type: FETCH_TODOS_REQUEST });
export const addTodoRequest = (title) => ({ type: ADD_TODO_REQUEST, title });
export const updateTodoRequest = (id, title) => ({ type: UPDATE_TODO_REQUEST, id, title });
export const deleteTodoRequest = (id) => ({ type: DELETE_TODO_REQUEST, id });
