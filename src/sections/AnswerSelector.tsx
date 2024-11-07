import { AnswerInput } from "./components/AnswerInput";
import { Options } from "./components/Options";
import { questionType } from "./Questions";

export function AnswerSelector({
  showCorrectAnswer,
  answerType,
  currentQuestion,
  answerAction,
}: {
  showCorrectAnswer?: boolean;

  answerType: "option" | "multiple" | "input";
  currentQuestion: { index: number; data: questionType; selected: string[] };
  answerAction:
    | ((currentQuestionIndex: number, answer: string[]) => void)
    | false;
}) {
  if (answerType == "option")
    return (
      <Options
        showCorrectAnswers={showCorrectAnswer}
        options={(currentQuestion.data.options ?? []).map((t) => ({
          text: t,
          correct: currentQuestion.data.answer[0] == t,
          selected: (currentQuestion.selected[0] ?? null) == t,
          onChange: () =>
            answerAction && answerAction(currentQuestion.index, [t]),
        }))}
      ></Options>
    );
  if (answerType == "multiple")
    return (
      <Options
        showCorrectAnswers={showCorrectAnswer}
        multiple={true}
        options={(currentQuestion.data.options ?? []).map((t) => ({
          text: t,
          correct:
            (
              currentQuestion.data.answer.find((selected) => selected == t) ??
              []
            ).length > 0,
          selected:
            (currentQuestion.selected.find((selected) => selected == t) ?? [])
              .length > 0,
          onChange: (e) =>
            answerAction &&
            answerAction(
              currentQuestion.index,
              e.target.checked
                ? [...currentQuestion.selected, t]
                : currentQuestion.selected.filter(
                    (selectedOption) => selectedOption != t
                  )
            ),
        }))}
      ></Options>
    );
  if (answerType == "input")
    return (
      <AnswerInput
        showCorrectAnswer={showCorrectAnswer}
        correctAnswer={currentQuestion.data.answer[0]}
        value={currentQuestion.selected[0] ?? ""}
        onChange={(e) =>
          answerAction && answerAction(currentQuestion.index, [e.target.value])
        }
      ></AnswerInput>
    );
  return <></>;
}
