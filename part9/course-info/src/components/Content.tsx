import { CoursePart } from "../types";

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <>
    {parts.map(({ name, exerciseCount }) => (
      <p key={name}>
        {name} {exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
