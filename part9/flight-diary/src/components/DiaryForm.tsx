import { useState, ChangeEventHandler, SyntheticEvent } from "react";

import { useField } from "../hooks";

import { NewDiary, Visibility, Weather } from "../types";

interface VisibilityOption {
  value: Visibility;
  label: string;
}
const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

interface WeatherOption {
  value: Weather;
  label: string;
}
const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

interface Props {
  onSubmit: (values: NewDiary) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, resetDate] = useField("text", "date");
  const [visibility, setVisibility] = useState(Visibility.Ok);
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, resetComment] = useField("text", "comment");

  const onVisibilityChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(
        (g) => g.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const onWeatherChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(
        (g) => g.toString() === value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date: date.value,
      visibility,
      weather,
      comment: comment.value,
    });

    void resetDate();
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
          <select value={visibility} onChange={onVisibilityChange}>
            {visibilityOptions.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          weather
          <select value={weather} onChange={onWeatherChange}>
            {weatherOptions.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
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
