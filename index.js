import { writeFileSync } from "fs";

const testContent = "testing...";

try {
    writeFileSync("./test.txt", testContent);
    console.log("success");
} catch (err) {
    console.log(err);
}