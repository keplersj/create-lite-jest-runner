import { jest } from "@jest/globals";

describe("Create Lite Jest Runner", () => {
  it("exports as expected", async () => {
    const module_ = await import("./index");
    expect(module_).toMatchSnapshot();
  });

  describe("runner creation function", () => {
    it("creates a valid runner class when executed", async () => {
      const { default: create } = await import("./index");

      const runner = create(jest.fn());

      expect(runner).toMatchSnapshot();

      const instance = new runner({} as any);

      expect(instance).toMatchSnapshot();
      expect(instance.runTests).toMatchSnapshot();
    });
  });

  describe("runner class", () => {
    it("calls the onStart function and later onSuccess function when the runner function resolves", async () => {
      const { default: create } = await import("./index");
      const runnerFunction = jest.fn(() => Promise.resolve());
      const runnerClass = create(runnerFunction as any);

      const runnerInstance = new runnerClass({ maxWorkers: 1 } as any);

      const onStart = jest.fn();
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      await runnerInstance.runTests(
        [
          {
            context: {} as any,
            path: "/test.js",
          },
        ],
        undefined as any,
        onStart as any,
        onSuccess as any,
        onFailure as any
      );

      expect(runnerFunction.mock).toMatchSnapshot();
      expect(runnerFunction).toBeCalledTimes(1);
      expect(onStart.mock).toMatchSnapshot();
      expect(onStart).toBeCalledTimes(1);
      expect(onSuccess.mock).toMatchSnapshot();
      expect(onSuccess).toBeCalledTimes(1);
      expect(onFailure.mock).toMatchSnapshot();
      expect(onFailure).toBeCalledTimes(0);
    });

    it("calls the onStart function and later onFailure function when the runner function rejects", async () => {
      const { default: create } = await import("./index");
      const runnerFunction = jest.fn(() => Promise.reject("Test Throw"));
      const runnerClass = create(runnerFunction as any);

      const runnerInstance = new runnerClass({ maxWorkers: 1 } as any);

      const onStart = jest.fn();
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      await runnerInstance.runTests(
        [
          {
            context: {} as any,
            path: "/test.js",
          },
        ],
        undefined as any,
        onStart as any,
        onSuccess as any,
        onFailure as any
      );

      expect(runnerFunction.mock).toMatchSnapshot();
      expect(runnerFunction).toBeCalledTimes(1);
      expect(onStart.mock).toMatchSnapshot();
      expect(onStart).toBeCalledTimes(1);
      expect(onSuccess.mock).toMatchSnapshot();
      expect(onSuccess).toBeCalledTimes(0);
      expect(onFailure.mock).toMatchSnapshot();
      expect(onFailure).toBeCalledTimes(1);
    });
  });
});
