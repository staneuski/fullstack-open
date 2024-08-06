import { useEffect, useState } from "react";

import { Diary } from "./types";

import diaryService from "./services/diaries";

import DiariesList from "./components/DiaryList";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const patients = await diaryService.getAll();
      setDiaries(patients);
    };
    void fetchDiaryList();
  }, []);

  return (
    <>
      <DiariesList diaries={diaries} />
    </>
  );
};

export default App;
