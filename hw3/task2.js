const getFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

const person = {
  firstName: "Marik",
  lastName: "Karp",
};

console.log(getFullName(person));

const words = (text) => text.split(" ");
const unique = (words) => words.filter((val, i, word) => i === word.indexOf(val));
const sorted = (unique) => [...unique].sort();
const filterUniqueWords = (text) => sorted(unique(words(text)));

const text = "word war king word king king";

console.log(filterUniqueWords(text));

const avg = (arr) => arr.reduce((total, grade) => total + grade, 0) / arr.length;
const flatten = (arr) => arr.flat();
const getGrades = (subjects) => subjects.map((subject) => subject.grades);
const getAverageGrade = (students) => avg(flatten(flatten(students.map(getGrades))));

const marik = [
  {
    name: "history",
    grades: [12, 10, 10, 11, 9, 10],
  },
  {
    name: "math",
    grades: [9, 11, 11, 10, 10, 11],
  },
  {
    name: "chemistry",
    grades: [10, 8, 11, 9, 9],
  },
];

const cat = [
  {
    name: "history",
    grades: [5, 5, 5, 7, 9],
  },
  {
    name: "math",
    grades: [12, 12, 12, 11, 12],
  },
  {
    name: "chemistry",
    grades: [10, 8, 12, 10],
  },
];
const students = [marik, cat];
console.log(getAverageGrade(students));
