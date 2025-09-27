import { createObjectCsvWriter } from "csv-writer";
import { writeFileSync, appendFileSync, existsSync, write } from "fs"; // to interact with your computer's file system (create, read, write, update, delete, etc)

export class Person {
    constructor(name = "", number = "", email = "") {
        this.name = name;
        this.number = number;
        this.email = email;
    }

    saveToCSV() { // developed with core modules
        if (!existsSync("./contacts.csv")) {
            writeFileSync("./contacts.csv", "");
        }

        const content = `${this.name},${this.number},${this.email}\n`;
        try {
            appendFileSync("./contacts.csv", content);
            console.log(`${this.name}: Contact saved!`)
        } catch (e) {
            console.error(e);
        }
    }

    async ep_saveToCSV() { // developed with external packages
        try {
            const { name, number, email } = this;
            await createObjectCsvWriter({
                path: "./ep_contacts.csv",
                append: true,
                header: [
                    {id: "name", title: "NAME"},
                    {id: "number", title: "NUMBER"},
                    {id: "email", title: "EMAIL"}
                ]
            }).writeRecords([{name, number, email}]);
        } catch (e) {
            console.error(e);
        }
    }
}