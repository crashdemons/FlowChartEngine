import("./EditorEntryPoint.mjs").then((imports) => {
    console.log(imports);
    const EditorEntryPoint = imports.default;
    (new EditorEntryPoint()).run(window);
});
