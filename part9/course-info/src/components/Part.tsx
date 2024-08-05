import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PartContent = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "background":
      return (
        <div>
          <i>{part.description}</i>
          <div>
            submit to{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </div>
        </div>
      );
    case "group":
      return <div>project exercises {part.groupProjectCount}</div>;
    case "special":
      return (
        <div>
          <i>{part.description}</i>
          <div>
            required skills: {part.requirements.map((req) => req).join(", ")}
          </div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Part = ({ part }: { part: CoursePart }) => {
  return (
    <div>
      <b>
        {part.name} {part.exerciseCount}
      </b>
      <PartContent part={part} />
    </div>
  );
};

export default Part;
