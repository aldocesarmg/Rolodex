import { writeFileSync } from "fs"; // to interact with your computer's file system (create, read, write, update, delete, etc)
import { createInterface } from "readline"; // to read data from a readable stream one line at a time
import { promisify } from 'util'; // to convert callback-based 

/* file creation and population
const testContent = "testing...";

try {
    writeFileSync("./test.txt", testContent);
    console.log("success");
} catch (err) {
    console.log(err);
}

*/

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

function getAnswer(message) {
    return new Promise((resolve) => {
        readline.question(message, (answer) => {
            resolve(answer);
            readline.close();
        })
    })
}

// getAnswer('tell me');

const questionPromisified = promisify(readline.question).bind(readline); // we need to use bind() function in order to replace global this (which englobes all variables of the program) to this (the actual values from the function)

async function getAnswerWithPromisify() {
    try {
        const answer = await questionPromisified('tell me something\n');
        console.log(`This is your input: ${answer}`);
    } catch (e) {
        console.log(e);
    } finally {
        readline.close();
    }
}

getAnswerWithPromisify();