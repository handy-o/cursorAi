export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface ResultType {
  id: string;
  name: string;
  description: string;
}

export interface TestData {
  title: string;
  description: string;
  questions: Question[];
  result_types: ResultType[];
  scoring_algorithm: {
    A: number[];
    B: number[];
    C: number[];
    D: number[];
    rules: string;
  };
  option_weights: {
    [key: string]: {
      A: number;
      B: number;
      C: number;
      D: number;
    };
  };
}

export interface UserInfo {
  age: string;
  gender: 'male' | 'female' | '';
}

export interface Answer {
  questionId: number;
  selectedOptionIndex: number;
}

