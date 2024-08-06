// import { useState } from "react";
// import axios from "axios";

import { Diary } from "../../types";
import DiaryEntry from "./DiaryEntry";

interface Props {
  diaries: Diary[];
  // setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryList = ({ diaries }: Props) => (
  <>
    <h3>Diary Entries</h3>
    {diaries.map((diary) => (
      <DiaryEntry key={diary.id} diary={diary} />
    ))}
  </>
);

export default DiaryList;
