import { actionType, mainStateType } from "../App";
import { AnswerSelector } from "./AnswerSelector";
import { QuestionText } from "./components/QuestionText";
import { questionType } from "./Questions";

export function Summary({
  questions,
  answers,
  actions,
}: {
  questions: questionType[];
  answers: mainStateType["answers"];
  actions: actionType;
}) {
  const switchEditQuestion = () => actions.switch("question");
  const submitQuestion = () => actions.switch("result");

  return (
    <>
      <div>
        <h1>Summary:-</h1>

        {questions.map((currentQuestion, currentQuestionIndex) => (
          <>
            <div className="question">
              <QuestionText
                questionNo={currentQuestionIndex + 1}
                text={currentQuestion.text}
              ></QuestionText>
              <AnswerSelector
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

        <div className="footer">
          <button onClick={switchEditQuestion}>EDIT</button>
        </div>
        <div className="footer">
          <button onClick={submitQuestion}>SUBMIT</button>
        </div>
      </div>
    </>
  );
}
