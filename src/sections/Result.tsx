import { mainStateType } from "../App";
import { AnswerSelector } from "./AnswerSelector";
import { QuestionText } from "./components/QuestionText";
import { questionType } from "./Questions";

export function Result({
  questions,
  answers,
}: {
  questions: questionType[];
  answers: mainStateType["answers"];
}) {
  const calculatedMarks = questions.reduce(
    (acc, thisQuestion, thisQuestionIndex) => {
      const areEqual = thisQuestion.answer.reduce(
        (acc, value) =>
          acc && answers[thisQuestionIndex].find((t) => t == value)
            ? true
            : false,
        true
      );

      if (answers[thisQuestionIndex] && areEqual) {
        acc["scored"]++;
      }

      return acc;
    },
    { total: questions.length, scored: 0 }
  );
  return (
    <>
      <div>
        <h1>Result:-</h1>

        {questions.map((currentQuestion, currentQuestionIndex) => (
          <>
            <div className="question">
              <QuestionText
                questionNo={currentQuestionIndex + 1}
                text={currentQuestion.text}
              ></QuestionText>
              <AnswerSelector
                showCorrectAnswer={true}
                answerType={currentQuestion.type}
                currentQuestion={{
                  index: currentQuestionIndex,
                  data: currentQuestion,
                  selected: (answers ?? {})[currentQuestionIndex] ?? [],
                }}
                answerAction={false}
              ></AnswerSelector>
            </div>
          </>
        ))}
        <div className="over_all_marks">
          <h2>Overall Marks:-</h2>
          <h1>
            {calculatedMarks.scored}/{calculatedMarks.total}
          </h1>
        </div>
      </div>
    </>
  );
}
