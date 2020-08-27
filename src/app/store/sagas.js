import { take, put, select } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import axios from "axios";

import * as mutations from "./mutations";
import {history} from "./history";

const url = process.env.NODE_ENV === `production` ? `` : "http://localhost:7777";

export function* taskCreationSaga() {
    while (true) {
        const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = `U1`;
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupId, ownerID));
        const { res } = yield axios.post(`${url}/task/new`, {
            task: {
                id: taskID,
                group: groupId,
                owner: ownerID,
                isComplete: false,
                name: "New Task"
            }
        });
        console.info("Got Response", res);
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE]);
        axios.post(`${url}/task/update`, {
            task: {
                id: task.taskID,
                group: task.groupID,
                name: task.name,
                isComplete: task.isComplete
            }
        });
    }
}

export function* userAthenticationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = yield axios.post(`${url}/authenticate`, { username, password });
            if (!data) {
                throw new Error();
            }
            console.log("Authenticated", data);
            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
            history.push("/dashboard");
        } catch (e) {
            console.log("Can't authenticate")
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}