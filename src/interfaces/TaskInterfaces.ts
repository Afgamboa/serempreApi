import {Document} from 'mongoose'

interface ITask extends Document {
  title: string,
  description: string,
  created_at?: Date,
  updated_at?: Date,
}

type TGetAllTasks = ITask[];

interface IDataValid {
  title?: string,
  description?: string
}

export {
  ITask,
  IDataValid,
  TGetAllTasks
}