import { put, takeEvery, call } from 'redux-saga/effects';

function fetchListData(userId) {
  return new Promise((resolve, reject) => {
    console.log('called the fetch' + userId);
    fetch(`http://localhost:4000/user/${userId}/listdata`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(() => {
        reject('error');
      });
  });
}

function* handleLoadListData(action) {
  try {
    let response = yield call(fetchListData, action.payload);
    yield put({
      type: 'SET_LIST_DATA_SUCCESS',
      payload: {
        listData: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'SET_LIST_DATA_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* listDataSaga() {
  yield takeEvery('REQUEST_LIST_DATA', handleLoadListData);
}

export default listDataSaga;
