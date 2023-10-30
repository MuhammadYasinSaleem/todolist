import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import * as fs from "fs"
import { isUtf8 } from "buffer";
import * as readline from "readline"


async function start() :Promise<number>{

    let ans = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What do you want to do?',
        choices: ['check todo list', 'add task', 'remove task', 'update task']
    })

    if (ans.choice == 'add task') {
        const file = 'file.txt';
        const r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        r1.question("Enter your task(Press Ctrl+C to exit)\n", (UserInput) => {
            const stream = fs.createWriteStream(file, { flags: 'a' });
            stream.write(UserInput + '\n');
            r1.on('line', (line) => {
                stream.write(line + '\n');
            })
            r1.on('close', () => {
                console.log(`Task added to ${file}`);
                stream.end();

            })

        })
        return 1;
    }
    if (ans.choice == 'check todo list') {
        const newfile = 'file.txt';
        await fs.readFile(newfile, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);

        })
        return 1;
    }

    if (ans.choice == 'remove task') {
        let arr: string[];
        const filePath = 'file.txt';
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            arr = data.split('\n');
        })
        let answer = await inquirer.prompt({
            type: 'number',
            name: 'index',
            message: `Which line do you want to remove?`,
        })
        if (answer.index <= arr.length) {
            arr.splice(answer.index - 1, 1);
        }
        const modifieddata: string = arr.join('\n');
        console.log(modifieddata);
        fs.writeFile(filePath, modifieddata, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('File has been updated ');

        })
        return 1;
    }


    if (ans.choice == 'update task') {
        let arr: string[];
        const filePath = 'file.txt';
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            arr = data.split('\n');
        })
        let answer = await inquirer.prompt([{
            type: 'number',
            name: 'index',
            message: `Which line do you want to update?`,
        },
        {
            type: 'input',
            name: 'newtask',
            message: `Enter the new task you want to add`
        }])
        if (answer.index <= arr.length) {
            arr.splice(answer.index - 1, 1, answer.newtask);
        }
        const modifieddata: string = arr.join('\n');
        console.log(modifieddata);
        fs.writeFile(filePath, modifieddata, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('File has been updated ');

        })
        return 1;
    }
    return 1;
}

async function call() {
    await start();
    // const dec = await decision();
    let option = await inquirer.prompt({
        type: 'list',
        name: 'opt',
        message: 'Do u want to Continue or exit',
        choices: ['Continue', 'Exit']
    })

}
await call();

