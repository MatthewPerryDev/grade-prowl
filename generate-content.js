import { readFileSync, readdirSync,writeFileSync,mkdirSync } from "fs";
import { fromCSV, op } from "arquero";
import { extname, join,normalize } from "path";

async function combineCSVsInFolder(folderPath) {
  const files = readdirSync(folderPath);
  let combinedTable;

  for (const file of files) {
    const filePath = join(folderPath, file);
    if (extname(file) === ".csv") {
      const csvData = readFileSync(filePath, "utf8");
      const table = fromCSV(csvData,{parse:{Honors:Boolean}});

      if (!combinedTable) {
        combinedTable = table;
      } else {
        combinedTable = combinedTable.union(table);
      }
    }
  }

  return combinedTable;
}

// Usage example
const data = await combineCSVsInFolder("./assets");

const avgGradesByInstructor = data
  .groupby(["Course", "Number", "Instructor"])
  .rollup({
    A: op.average("A"),
    B: op.average("B"),
    C: op.average("C"),
    D: op.average("D"),
    F: op.average("F"),
    P: op.average("P"),
    "F(P)": op.average("F(P)"),
    W: op.average("W"),
  })
  .groupby("Course", "Number");


const test = avgGradesByInstructor.objects({ grouped: true });
let pages = {};
for (const [course, courses] of test) {
  for (const [number, value] of courses) {
    value.forEach((x)=>{delete x.Course;delete x.Number;})
    pages[course + "-" + number.toString()] = {
      department: course,
      number: number,
      averages: value,
    };
  }
}
const courses = data.groupby("Course", "Number").objects({ grouped: true });

for (const [course, test] of courses) {
  for (const [number,value] of test){
    value.forEach((x)=>{delete x.Course;delete x.Number; delete x.CourseId})
    pages[course + "-" + number.toString()]["details"] = value;
    pages[course + "-" + number.toString()]["title"] = value[0].Title;
  }
}


console.log(process.cwd());
for (const page in pages){
  const obj = pages[page]
   writeFileSync(normalize(`./src/content/courses/${obj.department}-${obj.number}.json`),JSON.stringify(obj))
}

let searchIndex = [];
for (const page in pages){
  const obj = pages[page]
  searchIndex.push({
    fullName: `${obj.department}-${obj.number}: ${obj.title}`,
    route: `${obj.department}-${obj.number}`
  })
}

writeFileSync(join('.','public','searchIndex.json'),JSON.stringify(searchIndex))
