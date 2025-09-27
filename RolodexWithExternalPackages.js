import prompt from "prompt";

import { Person } from "./Person.js";

prompt.start();
prompt.message = "";

async function startApp() {
    const questions = [
        // name value is converted to variable and description is the prompt text
        {name: "name", description: "Contact name"},
        {name: "number", description: "Contact number"},
        {name: "email", description: "Contact email"}
    ];

    const responses = await prompt.get(questions);
    const newPerson = new Person(responses.name, responses.number, responses.email);
    await newPerson.ep_saveToCSV();

    const { keepRunning } = await prompt.get([{name: "keepRunning", description: "Continue (Y/N)?"}]);

    if (keepRunning.toLowerCase() === "y") await startApp();
}

startApp();