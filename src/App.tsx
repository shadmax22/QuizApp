import { useEffect, useState } from "react";
import "./App.css";
import { Summary } from "./sections/Summary";
import { Result } from "./sections/Result";
import {
  Questions,
  questionType,
  userResponseType,
} from "./sections/Questions";

export type options = {
  list: string[];
  selected: null | number;
  correctOption: number; // index of option
};
export type dataType = {
  timer: {
    totalTime: number;
  };
  display: "question" | "summary" | "result";
  questions: {
    id: number;
    question: string;
    options: options;
  }[];
};
export type stateType = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
};

export type mainStateType = {
  timer: {
    totalTime: number;
  };
  display: "question" | "summary" | "result";

  answers: userResponseType["userAnswers"];
};
export type actionType = {
  switch: (viewName: dataType["display"]) => void;
  saveAnswers: (data: mainStateType["answers"]) => void;
};

const questions: questionType[] = [
  {
    text: "Lorem porem impson Lorem porem impson Lorem porem impson",
    type: "option",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: ["Option 1"],
  },
  {
    text: "Lorem porem impson Lorem porem impson Lorem porem impson",
    type: "multiple",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: ["Option 1", "Option 2"],
  },
  {
    text: "Lorem porem impson Lorem porem impson Lorem porem impson",
    type: "input",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: ["Option 1"],
  },
];
function App() {
  const [data, setData] = useState<mainStateType>({
    timer: {
      totalTime: 100,
    },
    display: "question",
    answers: {},
  });

  const actions: actionType = {
    switch: (viewName) =>
      setData((data) => ({
        ...data,
        display: viewName,
      })),
    saveAnswers: (answers) =>
      setData((data) => ({
        ...data,
        answers,
      })),
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (data.timer.totalTime - 1 == 0) {
        setData({
          ...data,
          display: "result",
        });
        clearInterval(timer);
      } else {
        setData({
          ...data,
          timer: {
            ...data.timer,
            totalTime: data.timer.totalTime - 1,
          },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  if (data.display == "result")
    return <Result questions={questions} answers={data.answers ?? {}} />;
  if (data.display == "summary")
    return (
      <Summary
        questions={questions}
        answers={data.answers ?? {}}
        actions={actions}
      />
    );

  return (
    <>
      <h1>Quiz Questions:-</h1>
      <h2>Time Left:- {data.timer.totalTime}</h2>
      <Questions
        questions={questions}
        savedAnswers={data.answers}
        actions={actions}
      ></Questions>
    </>
  );
}

export default App;
