// This version of the app uses only core modules (fs, readline, util)

import { createInterface } from "readline"; // to read data from a readable stream one line at a time
import { promisify } from 'util'; // to convert callback-based 

import { Person } from "./Person.js";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getAnswerWithPromisify(message) {
    try {
        const questionPromisified = promisify(readline.question).bind(readline); // we need to use bind() function in order to replace global this (which englobes all variables of the program) to this (the actual values from the function)
        return await questionPromisified(message);
    } catch (e) {
        console.log(e);
    }
}

async function startApp() {
    let shouldContinue = true;

    do {
        const name = await getAnswerWithPromisify('Enter your name: ');
        const number = await getAnswerWithPromisify('Enter your number: ');
        const email = await getAnswerWithPromisify('Enter your email: ');

        const newPerson = new Person(name, number, email);
        newPerson.saveToCSV();

        const response = await getAnswerWithPromisify('Should we continue adding contacts (Y/N)?');
        if (response.toLowerCase() === "n") shouldContinue = false;
    } while (shouldContinue);
}

try {
    await startApp();
} catch(e) {
    console.error(e);
} finally {
    readline.close();
}