export function Options({
  options,
  multiple,
  showCorrectAnswers,
}: {
  showCorrectAnswers?: boolean;
  multiple?: boolean;
  options: {
    text: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    selected: boolean;
    correct: boolean;
  }[];
}) {
  return (
    <>
      <div className="options">
        {options.map((thisOption) => (
          <div className="option_list">
            <input
              type={multiple ? "checkbox" : "radio"}
              onChange={thisOption.onChange}
              checked={thisOption.selected}
            ></input>
            {thisOption.text}

            {showCorrectAnswers && thisOption.correct && <b>-- CORRECT</b>}
          </div>
        ))}
      </div>
    </>
  );
}
