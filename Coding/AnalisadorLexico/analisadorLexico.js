let errorMessageTimer;

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
document.getElementById('processButton').addEventListener('click', processCode);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('codeInput').value = e.target.result;
        };
        reader.readAsText(file);
    }
}

function processCode() {
    const codeInput = document.getElementById('codeInput');
    const code = codeInput.value;
    const language = document.getElementById('languageSelect').value;
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0 && code.trim() === '') {
        displayErrorMessage('Por favor, selecione um arquivo ou insira o código na textarea.');
        startErrorMessageTimer();
        return;
    }

    const fileExtension = getFileExtension();
    const languages = {
        javascript: {
            extensions: ['.js', '.txt'],
            definition: {
                keywords: [
                    'if', 'else', 'while', 'class', 'constructor', 'return', 'break', 'continue', 'switch', 'case', 
                    'try', 'catch', 'finally', 'throw', 'const', 'let', 'var', 'function', 'import', 'export', 'default', 'new', 'delete', 'typeof', 'instanceof', 'void'
                ],
                relationalOperators: ['<', '>', '<=', '>=', '==', '!=', '===', '!=='],
                arithmeticOperators: ['+', '-', '*', '/', '%', '++', '--'],
                logicalOperators: ['&&', '||', '!', '??'],
                assignmentOperator: '=',
                delimiters: ['(', ')', '{', '}', '[', ']', ',', ';', ':'],
                specialCharacters: ['.', '?', ':', '$'],
                types: ['String', 'Number', 'Boolean', 'Object', 'Array', 'Function']
            }
        },
        java: {
            extensions: ['.java', '.txt'],
            definition: {
                keywords: [
                    'if', 'else', 'while', 'do', 'for', 'class', 'return', 'break', 'continue', 'switch', 'case', 
                    'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package', 'extends', 'implements', 'interface', 'abstract', 'public', 'protected', 'private', 'static', 'final', 'void', 'new', 'this', 'super', 'synchronized', 'volatile', 'transient', 'instanceof', 'enum', 'assert', 'native', 'strictfp', 'default'
                ],
                relationalOperators: ['<', '>', '<=', '>=', '==', '!='],
                arithmeticOperators: ['+', '-', '*', '/', '%', '++', '--'],
                logicalOperators: ['&&', '||', '!'],
                assignmentOperator: '=',
                delimiters: ['(', ')', '{', '}', '[', ']', ',', ';', ':'],
                specialCharacters: ['.', '$'],
                types: ['String', 'int', 'char', 'byte', 'short', 'long', 'float', 'double', 'boolean']
            }
        }
    };

    if (!languages[language]) {
        displayErrorMessage('Linguagem não suportada.');
        startErrorMessageTimer();
        return;
    }

    if (fileInput.files.length > 0 && !languages[language].extensions.includes(fileExtension)) {
        displayErrorMessage('Por favor, selecione um arquivo com a extensão apropriada para a linguagem escolhida.');
        startErrorMessageTimer();
        return;
    }

    const tokens = tokenize(code, languages[language].definition);
    displayTokens(tokens);
}

function tokenize(code, languageDefinition) {
    const { keywords, relationalOperators, arithmeticOperators, logicalOperators, assignmentOperator, delimiters, specialCharacters, types } = languageDefinition;
    const tokens = [];
    
    code = code.replace(/#.*|'''.*?'''|""".*?"""|\/\/.*/g, '');

    delimiters.forEach(delimiter => {
        code = code.split(delimiter).join(` ${delimiter} `);
    });

    relationalOperators.forEach(operator => {
        code = code.split(operator).join(` ${operator} `);
    });

    arithmeticOperators.forEach(operator => {
        code = code.split(operator).join(` ${operator} `);
    });

    logicalOperators.forEach(operator => {
        code = code.split(operator).join(` ${operator} `);
    });

    specialCharacters.forEach(character => {
        code = code.split(character).join(` ${character} `);
    });

    code = code.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');

    const words = code.split(/\s+/);

    for (const word of words) {
        if (word.trim() === '') continue;
        if (keywords.includes(word)) {
            tokens.push({ type: 'Keyword', value: word });
        } else if (relationalOperators.includes(word)) {
            tokens.push({ type: 'RelationalOperator', value: word });
        } else if (arithmeticOperators.includes(word)) {
            tokens.push({ type: 'ArithmeticOperator', value: word });
        } else if (logicalOperators.includes(word)) {
            tokens.push({ type: 'LogicalOperator', value: word });
        } else if (word === assignmentOperator) {
            tokens.push({ type: 'AssignmentOperator', value: word });
        } else if (delimiters.includes(word)) {
            tokens.push({ type: 'Delimiter', value: word });
        } else if (specialCharacters.includes(word)) {
            tokens.push({ type: 'SpecialCharacter', value: word });
        } else if (types.includes(word)) {
            tokens.push({ type: 'Type', value: word });
        } else if (!isNaN(Number(word))) {
            tokens.push({ type: 'Number', value: word });
        } else {
            tokens.push({ type: 'Identifier', value: word });
        }
    }

    return tokens;
}

function getFileExtension() {
    const fileInput = document.getElementById('fileInput');
    const fileName = fileInput.value;
    return fileName.substring(fileName.lastIndexOf('.'));
}

function displayTokens(tokens) {
    const outputElement = document.getElementById('tokensOutput');
    outputElement.innerHTML = '';
    tokens.forEach(token => {
        const tokenElement = document.createElement('span');
        tokenElement.className = token.type.toLowerCase().replace(/ /g, '-');
        tokenElement.textContent = `${token.type}: ${token.value}\n`;
        outputElement.appendChild(tokenElement);
    });
}

function displayErrorMessage(message) {
    document.getElementById('errorMessage').textContent = message;
}

function startErrorMessageTimer() {
    clearTimeout(errorMessageTimer);
    errorMessageTimer = setTimeout(clearErrorMessage, 10000);
}

function clearErrorMessage() {
    document.getElementById('errorMessage').textContent = '';
}
