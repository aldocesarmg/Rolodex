import { writeFileSync } from "fs";
import { createInterface } from "readline";

const testContent = "testing...";

try {
    writeFileSync("./test.txt", testContent);
    console.log("success");
} catch (err) {
    console.log(err);
}

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

getAnswer('tell me');