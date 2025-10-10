import { Answer, TestData, ResultType } from '@/types';

const optionToTypeMapping: { [key: number]: string[] } = {
  1: ['D', 'A', 'B', 'D'],
  2: ['A', 'B', 'C', 'B'],
  3: ['D', 'B', 'C', 'B'],
  4: ['A', 'B', 'C', 'C'],
  5: ['A', 'B', 'D', 'D'],
  6: ['A', 'B', 'C', 'C'],
  7: ['A', 'B', 'A', 'C'],
  8: ['B', 'B', 'A', 'C'],
  9: ['A', 'B', 'C', 'D'],
  10: ['A', 'B', 'C', 'C'],
  11: ['A', 'B', 'C', 'B'],
  12: ['A', 'B', 'C', 'C'],
  13: ['A', 'B', 'C', 'D'],
  14: ['A', 'B', 'C', 'B'],
  15: ['D', 'B', 'C', 'B'],
  16: ['A', 'B', 'C', 'C'],
  17: ['A', 'B', 'C', 'C'],
  18: ['A', 'B', 'C', 'B'],
  19: ['A', 'B', 'C', 'C'],
  20: ['D', 'B', 'C', 'B'],
};

export const calculateResult = (
  answers: Answer[],
  testData: TestData
): ResultType => {
  const scores = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };

  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const selectedOptionIndex = answer.selectedOptionIndex;
    
    const mapping = optionToTypeMapping[questionId];
    if (mapping && mapping[selectedOptionIndex]) {
      const type = mapping[selectedOptionIndex] as 'A' | 'B' | 'C' | 'D';
      scores[type] += 1;
    }
  });

  const maxScore = Math.max(scores.A, scores.B, scores.C, scores.D);
  
  const priority = ['D', 'C', 'B', 'A'];
  let resultId = 'B';
  
  for (const id of priority) {
    if (scores[id as keyof typeof scores] === maxScore) {
      resultId = id;
      break;
    }
  }

  const result = testData.result_types.find((r) => r.id === resultId);
  
  return result || testData.result_types[0];
};
