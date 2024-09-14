
import("./TestEntryPoint.mjs").then((imports)=> {
    const TestEntryPoint = imports.default;
    (new TestEntryPoint()).run(window);
});
