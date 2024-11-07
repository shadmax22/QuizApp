import { useState } from "react";
import { actionType } from "../App";
import { AnswerSelector } from "./AnswerSelector";
import { Footer } from "./components/Footer";
import { QuestionText } from "./components/QuestionText";
export type questionType = {
  text: string;
  type: "option" | "input" | "multiple";
  options?: string[];
  answer: string[];
};

export type userResponseType = {
  currentQuestionIndex: number;
  userAnswers: {
    [answer_id: string | number]: string[];
  };
};
export function Questions({
  questions,
  actions,
  savedAnswers,
}: {
  actions: actionType;
  questions: questionType[];
  savedAnswers: userResponseType["userAnswers"];
}) {
  const [data, setData] = useState<userResponseType>({
    currentQuestionIndex: 0,

    userAnswers: savedAnswers,
  });
  const currentQuestionIndex = data.currentQuestionIndex;

  const currentQuestion = questions[currentQuestionIndex];

  const switchSummary = () => {
    actions.saveAnswers(data.userAnswers);
    actions.switch("summary");
  };

  const switchPreviousQuestion = () => {
    setData({
      ...data,

      currentQuestionIndex: data.currentQuestionIndex - 1,
    });
  };
  const switchNextQuestion = () => {
    setData({
      ...data,

      currentQuestionIndex: data.currentQuestionIndex + 1,
    });
  };

  const answerAction = (currentQuestionIndex: number, answer: string[]) => {
    const clone_data = structuredClone(data);

    clone_data["userAnswers"][currentQuestionIndex] = answer;

    setData(clone_data);
  };

  return (
    <>
      <div>
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
              selected: data.userAnswers[currentQuestionIndex] ?? [],
            }}
            answerAction={answerAction}
          ></AnswerSelector>
          <Footer
            buttons={[
              {
                text: "Previous",
                onclick: switchPreviousQuestion,
                attributes: {
                  disabled: currentQuestionIndex == 0,
                },
              },

              currentQuestionIndex == questions.length - 1
                ? {
                    text: "Complete",
                    onclick: switchSummary,
                  }
                : {
                    text: "Next",
                    onclick: switchNextQuestion,
                  },
            ]}
          ></Footer>
        </div>
      </div>
    </>
  );
}
