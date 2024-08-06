import { Diary } from "../../types";

const DiaryEntry = ({ diary }: { diary: Diary }) => (
  <span>
    <h4>{diary.date}</h4>
    <div>visibility: {diary.visibility}</div>
    <div>weather: {diary.weather}</div>
  </span>
);

export default DiaryEntry;
