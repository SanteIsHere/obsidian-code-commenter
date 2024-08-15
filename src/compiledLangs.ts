export function toggleCommentCompiledLangs(code: string): string {
    if (code.startsWith("//"))
        return code.replace("// ", "");
    else
        // Return the code prefixed with the appropriate comment identifier
        return `// ${code}`;
}