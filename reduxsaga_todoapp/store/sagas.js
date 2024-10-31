// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
} from './actions';

const API_URL = 'https://6454008bc18adbbdfead590d.mockapi.io/api/v1/api_todolist';

function* fetchTodos() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put({ type: FETCH_TODOS_SUCCESS, todos: response.data });
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, error });
  }
}
function* addTodoSaga(action) {
    try {
      yield call(axios.post, API_URL, { title: action.title });
      yield put({ type: FETCH_TODOS_REQUEST });
    } catch (error) {
      console.error("Error adding item", error);
    }
  }

export function* todoSaga() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodos);
  yield takeLatest(ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga);
}
