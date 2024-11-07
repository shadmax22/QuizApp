export function QuestionText({
  questionNo,
  text,
}: {
  questionNo: number;
  text: string;
}) {
  return (
    <>
      <h4>
        Q{questionNo}
        {". "}
        {text}
      </h4>
    </>
  );
}
