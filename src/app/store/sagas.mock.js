import { take, put, select } from 'redux-saga/effects';
import * as mutation from "./mutations";
import {v4 as uuid} from 'uuid';

export function* taskCreationSaga() {
    while (true) {
        const { groupId } = yield take(mutation.REQUEST_TASK_CREATION);
        const ownerID = `U1`;
        const taskID = uuid();
        yield put(mutation.createTask(taskID, groupId, ownerID));
    }
}