import { BaseModel } from "./BaseModel";
import { getFromStorage, AddTostorage, addToStorage } from "../utils";

export class Task extends BaseModel {
    constructor(userId, text) {
        super();
        this.userId = userId;
        this.text = text;
        this.storageKey = "tasks";
    }
    get getStatus(id) {
        let tasks = getFromStorage(this.storageKey);
        if (tasks.length == 0) return false;
        return tasks.find(task => task.id == id).status;
    }
    set setStatus(id) {
        let tasks = getFromStorage(this.storageKey);
    }
    static save(task) {
        try {
            addToStorage(task, task.storageKey);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }
}