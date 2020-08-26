import { take, put, select } from 'redux-saga/effects';
import * as mutations from "./mutations";
import {v4 as uuid} from 'uuid';

export function* taskCreationSaga() {
    while (true) {
        const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = `U1`;
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupId, ownerID));
    }
}