'use client';

import { useTestStore } from '@/store/useTestStore';
import MainScreen from '@/components/MainScreen';
import TestScreen from '@/components/TestScreen';
import ResultScreen from '@/components/ResultScreen';
import LoadingScreen from '@/components/LoadingScreen';
import testData from '@/data.json';

export default function Home() {
  const { isTestStarted, isTestCompleted, isCalculating } = useTestStore();

  if (isTestCompleted) {
    return <ResultScreen testData={testData} />;
  }

  if (isCalculating) {
    return <LoadingScreen />;
  }

  if (isTestStarted) {
    return <TestScreen testData={testData} />;
  }

  return <MainScreen testData={testData} />;
}
