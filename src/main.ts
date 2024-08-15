import { EditorPosition, MarkdownView, Plugin } from 'obsidian';
import { toggleCommentCompiledLangs } from './compiledLangs';
// import { toggleCommentCompiledLangs } from './kotlin';


export default class CodeCommenter extends Plugin {

	// Define logic to execute when the plugin is loaded
	async onload() {
		this.addCommand({
			id: "comment-line",
			name: "Comment current line",
			callback: () => this.commentLine()
		});
	}

	commentLine() {
		// Ensure that the active view of the Obsidian app is the Markdown view/editor
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);


        if (activeView) {
            // Get the editor
			let editor = activeView.editor;
			// Get the content of the editor (text)
            let content = editor.getValue();

            // Regular expression used to match against code blocks
            const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
            
			let match = codeBlockRegex.exec(content);

			if (match !== null) {
				// Identify the programming language
				const lang: string = match[1];

				// Get the cursor's position and current line
				const cursorPos: EditorPosition = editor.getCursor();
				const line: string = editor.getLine(cursorPos.line);
				
				editor.setLine(cursorPos.line, this.generateLineComment(lang, line));
			}
            // if ((match = codeBlockRegex.exec(content)) !== null) {
            //     // Programming language is the first capture
			// 	const language: string = match[1];
            //     // Source code contained in the second capture group
			// 	const code: string = match[2];
				
			// 	const commentedCode: string = this.generateLineComment(language, code);

			// 	// 0 + 3 (```) + length of first capture 
			// 	const fromIndex: number = match.index + 3 + match[1].length;  
			// 	const toIndex: number = fromIndex + code.length;

			// 	const startPos: EditorPosition = editor.offsetToPos(fromIndex+1);
			// 	const endPos: EditorPosition = editor.offsetToPos(toIndex+1);

			// 	editor.replaceRange(commentedCode, startPos, endPos);
				
			// 	// Get the current value of the text in the editor
			// 	editor = activeView.editor;
			// 	content = editor.getValue();
			// 	/* 
			// 	const newPos: EditorPosition = {line: startPos.line, ch: startPos.ch + (commentedCode.length-1)};

			// 	console.log(`New pos: ${newPos}`);

			// 	editor.setCursor(newPos); 
			// 	*/
			// }
		}
	}
	
	/**
	 * This method is responsible for generating the commented (or uncommented) line of code
	 * based on the `language` parameter
	 * @param language The target programming language
	 * @param code The code to comment
	 * @returns The commented line of code
	 */
	generateLineComment(language: string, code: string): string {
		switch (language) {
			case "kotlin":
			case "c":
			case "c++":
			case "java":
				return toggleCommentCompiledLangs(code);
				break;
			default:
				return "";
				break;
		}
	}
}

