#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

// Welcome message
(function display() {
  console.clear();
  console.log(
    chalk.greenBright.bold.italic(
      figlet.textSync(`\nSaifi School Application\n`)
    )
  );
})();

// In-memory storage for students
const students: {
  name: string;
  class: string;
  gender: string;
  enrollmentNumber: string;
}[] = [];

// Function to generate a unique enrollment number
function generateEnrollmentNumber(): string {
  return chalk.yellowBright(`ENR-${Math.floor(1000 + Math.random() * 9000)}`);
}

// Function to manage the school
async function SaifiSchool() {
  let exit = false;
  while (!exit) {
    // Prompting the user for their choice
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "Management",
        message: chalk.green.bold("What do you want to do?"),
        choices: [
          "Add Student",
          "Exit",
          "Find Student",
          "Check Fee",
          "Students View",
        ],
      },
    ]);

    // Handling choices
    switch (answers.Management) {
      case "Check Fee":
        console.log(
          chalk.yellowBright.bold("\n\t\t Here is the list of Fees: \n")
        );

        // Display fees for different classes
        console.log(`\t\t ${chalk.greenBright.bold("Class 6th")} \n`);
        console.log(
          `\t${chalk.cyanBright.bold("Admission Fee: ")} ${chalk.whiteBright(
            5000
          )}\n`
        );
        console.log(
          `\t${chalk.cyanBright.bold("Monthly Fee: ")} ${chalk.whiteBright(
            2000
          )}\n`
        );
        console.log(
          `\t${chalk.cyanBright.bold(
            "Six-month semester Fee: "
          )} ${chalk.whiteBright(12000)}\n`
        );

        console.log(`\t\t ${chalk.yellowBright.bold("Class 7th")} \n`);
        console.log(
          `\t${chalk.cyanBright.bold("Admission Fee: ")} ${chalk.whiteBright(
            6000
          )}\n`
        );
        console.log(
          `\t${chalk.cyanBright.bold("Monthly Fee: ")} ${chalk.whiteBright(
            2500
          )}\n`
        );
        console.log(
          `\t${chalk.cyanBright.bold(
            "Six-month semester Fee: "
          )} ${chalk.whiteBright(15000)}\n`
        );

        console.log(`\t\t ${chalk.yellowBright.bold("Class 8th")} \n`);
        console.log(
          `\t${chalk.cyanBright.bold("Admission Fee: ")} ${chalk.whiteBright(
            8000
          )}\n`
        );
        console.log(
          `\t${chalk.cyanBright.bold("Monthly Fee: ")} ${chalk.whiteBright(
            3000
          )}\n`
        );
        console.log(
          `\t${chalk.cyanBright.bold(
            "Six-month semester Fee: "
          )} ${chalk.whiteBright(18000)}\n`
        );
        break;

      case "Add Student":
        console.log(chalk.blue.bold("\n\tPlease add a new student.\n"));

        // Logic to add a student
        const studentDetails = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: chalk.green.bold("Enter student name:"),
          },
          {
            type: "list",
            name: "class",
            message: chalk.green.bold("Enter student class:"),
            choices: ["Class 6th", "Class 7th", "Class 8th"],
          },
          {
            type: "list",
            name: "gender",
            message: chalk.green.bold("Select student gender:"),
            choices: ["Male", "Female"],
          },
        ]);

        // Display the fee for the selected class
        const fees = {
          "Class 6th": 5000,
          "Class 7th": 6000,
          "Class 8th": 8000,
        };

        const feeToPay = fees[studentDetails.class as keyof typeof fees];
        console.log(
          chalk.blue(
            `\n\tThe admission fee for ${
              studentDetails.class
            } is ${chalk.greenBright(feeToPay)}.\n`
          )
        );

        // Ask for payment confirmation
        const paymentConfirmation = await inquirer.prompt([
          {
            type: "confirm",
            name: "payment",
            message: chalk.green.bold(
              `Do you want to pay the admission fee of ${chalk.cyanBright.bold(
                feeToPay
              )}?`
            ),
          },
        ]);

        if (paymentConfirmation.payment) {
          const enrollmentNumber = generateEnrollmentNumber();
          students.push({
            name: studentDetails.name,
            class: studentDetails.class,
            gender: studentDetails.gender,
            enrollmentNumber: enrollmentNumber,
          });
          console.log(
            chalk.green(
              `\nStudent ${chalk.whiteBright(
                studentDetails.name
              )} has been enrolled in ${chalk.cyanBright(
                studentDetails.class
              )} with enrollment number ${chalk.yellowBright(
                enrollmentNumber
              )}.\n`
            )
          );
        } else {
          console.log(
            chalk.red("\nPayment not completed. Enrollment failed.\n")
          );
        }
        break;

      case "Exit":
        console.log(
          chalk.yellow.bold(
            "\n\t\tThank you for using Saifi School Application.\n"
          )
        );
        exit = true;
        break;

      case "Students View":
        if (students.length === 0) {
          console.log(chalk.yellow("\nNo students enrolled yet.\n"));
        } else {
          console.log(
            chalk.blue.bold("\n\tList of Enrolled Students is here\n")
          );
          students.forEach((student) => {
            console.log(
              chalk.greenBright(
                `Name: ${chalk.whiteBright(
                  student.name
                )}, Class: ${chalk.blueBright(
                  student.class
                )}, Gender: ${chalk.magentaBright(
                  student.gender
                )}, Enrollment Number: ${chalk.yellowBright(
                  student.enrollmentNumber
                )}`
              )
            );
          });
          const totalBoys = students.filter(
            (student) => student.gender === "Male"
          ).length;
          const totalGirls = students.filter(
            (student) => student.gender === "Female"
          ).length;
          console.log(
            chalk.blue(
              `\nTotal Boys: ${chalk.greenBright(
                totalBoys
              )}, Total Girls: ${chalk.greenBright(totalGirls)}\n`
            )
          );
        }
        break;

      case "Find Student":
        console.log(
          chalk.blue.bold("\n\tPlease enter the student details to find.\n")
        );
        // Logic to find a student
        const findStudentDetails = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: chalk.green.bold("Enter student name:"),
          },
        ]);
        const foundStudent = students.find(
          (student) =>
            student.name.toLowerCase() === findStudentDetails.name.toLowerCase()
        );
        if (foundStudent) {
          console.log(
            chalk.green(
              `\nStudent found: Name: ${chalk.whiteBright(
                foundStudent.name
              )}, Class: ${chalk.blueBright(
                foundStudent.class
              )}, Gender: ${chalk.magentaBright(
                foundStudent.gender
              )}, Enrollment Number: ${chalk.yellowBright(
                foundStudent.enrollmentNumber
              )}\n`
            )
          );
        } else {
          console.log(
            chalk.red(
              `\nStudent ${chalk.magentaBright(
                findStudentDetails.name
              )} not found.\n`
            )
          );
        }
        break;

      default:
        console.log(chalk.red.bold("Invalid choice, exiting..."));
        exit = true;
        break;
    }
  }
}

// Execute the function
SaifiSchool();
