import { SyntheticEvent } from "react";

import { useField } from "../hooks";

import { NewDiary, Visibility, Weather } from "../types";

interface Props {
  onSubmit: (values: NewDiary) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, resetDate] = useField("text", "date");
  const [visibility, resetVisibility] = useField("text", "visibility");
  const [weather, resetWeather] = useField("text", "title");
  const [comment, resetComment] = useField("text", "comment");

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date: date.value,
      visibility: visibility.value as Visibility,
      weather: weather.value as Weather,
      comment: comment.value,
    });

    void resetDate();
    void resetVisibility();
    void resetWeather();
    void resetComment();
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          date
          <input {...date} />
        </div>
        <div>
          visibility
          <input {...visibility} />
        </div>
        <div>
          weather
          <input {...weather} />
        </div>
        <div>
          comment
          <input {...comment} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
