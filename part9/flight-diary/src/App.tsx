import { useEffect, useState } from "react";
import axios from "axios";

import { Diary, NewDiary } from "./types";

import diaryService from "./services/diaries";

import DiariesForm from "./components/DiaryForm";
import DiariesList from "./components/DiaryList";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  const submitNewDiary = async (values: NewDiary) => {
    try {
      const diary = await diaryService.create(values);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognised axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <>
      {error && <Notification message={error} />}
      <DiariesForm onSubmit={submitNewDiary} />
      <DiariesList diaries={diaries} />
    </>
  );
};

export default App;
