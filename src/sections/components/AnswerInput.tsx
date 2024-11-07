export function AnswerInput({
  onChange,
  value,
  showCorrectAnswer,
  correctAnswer,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  showCorrectAnswer?: boolean;
  correctAnswer: string;
}) {
  return (
    <>
      <input onChange={onChange} value={value}></input>

      {showCorrectAnswer && (
        <>
          <br />
          <b>Correct Answer: {correctAnswer}</b>
        </>
      )}
    </>
  );
}
