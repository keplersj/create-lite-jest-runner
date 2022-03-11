describe("Create Lite Jest Runner Result Creation Helpers", () => {
  describe("Passing Test Helper", () => {
    it("creates a TestResult object", async () => {
      const { pass } = await import("./results");

      expect(
        pass({
          start: 1000,
          end: 2000,
          test: {
            path: "/testPath",
          },
        })
      ).toMatchSnapshot();
    });
  });

  describe("Failing Test Helper", () => {
    it("creates a TestResult object", async () => {
      const { fail } = await import("./results");

      expect(
        fail({
          start: 1000,
          end: 2000,
          test: {
            path: "/testPath",
            errorMessage: "This failed because you're a bad programmer.",
          },
        })
      ).toMatchSnapshot();
    });
  });
});
