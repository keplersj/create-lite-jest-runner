import { AssertionResult, TestResult } from "@jest/test-result";

interface ResultAttributes {
  start: number;
  end: number;
  test: {
    path: string;
    errorMessage?: string;
  };
}

const defaultResult: TestResult = {
  console: undefined,
  coverage: undefined,
  displayName: undefined,
  failureMessage: undefined,
  leaks: false,
  memoryUsage: undefined,
  numFailingTests: 0,
  numPassingTests: 0,
  numPendingTests: 0,
  numTodoTests: 0,
  openHandles: [],
  perfStats: {
    end: 0,
    runtime: 0,
    slow: false,
    start: 0,
  },
  skipped: false,
  snapshot: {
    added: 0,
    fileDeleted: false,
    matched: 0,
    unchecked: 0,
    uncheckedKeys: [],
    unmatched: 0,
    updated: 0,
  },
  testExecError: undefined,
  testFilePath: "",
  testResults: [] as AssertionResult[],
  v8Coverage: undefined,
};

function createPerformanceStats(startTime: number, endTime: number) {
  return {
    end: endTime,
    runtime: endTime - startTime,
    slow: false,
    start: startTime,
  };
}

export function pass(attributes: ResultAttributes): TestResult {
  return {
    ...defaultResult,
    numPassingTests: 1,
    perfStats: createPerformanceStats(attributes.start, attributes.end),
    testFilePath: attributes.test.path,
    testResults: [
      {
        ancestorTitles: [],
        failureDetails: [],
        failureMessages: attributes.test.errorMessage
          ? [attributes.test.errorMessage]
          : [],
        fullName: "",
        numPassingAsserts: 1,
        status: "passed",
        title: "",
      },
    ],
  };
}

export function fail(attributes: ResultAttributes): TestResult {
  return {
    ...defaultResult,
    failureMessage: attributes.test.errorMessage,
    numFailingTests: 1,
    perfStats: createPerformanceStats(attributes.start, attributes.end),
    testFilePath: attributes.test.path,
    testResults: [
      {
        ancestorTitles: [],
        failureDetails: [],
        failureMessages: attributes.test.errorMessage
          ? [attributes.test.errorMessage]
          : [],
        fullName: "",
        numPassingAsserts: 0,
        status: "failed",
        title: "",
      },
    ],
  };
}
