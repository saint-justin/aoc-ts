import aoc_2019 from './2019'
import readFile from './helpers/readFile'

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Invalid inputs, required format is "npm start <year> <day>"');
  process.exit(1);
}

run(parseInt(args[0]), parseInt(args[1]));

async function run (year: number, day: number) {
  const paddedDay = day.toString().padStart(2, '0');
  const inputLine = await readFile(`src/inputs/${year}/day_${paddedDay}.txt`);
  if (!inputLine) { 
    console.error(`Unable to read input from /inputs/${year}/day_${paddedDay}.txt`);
    process.exit(1);
  }

  const input = inputLine.split(/\r?\n/).map(line => line.trim());
  console.log(`Running problem ${paddedDay} for year ${year}:`);

  switch (year) {
    case 2019: 
      aoc_2019(day, input);
      break;
  
    default:
      console.error(`Unable to find year ${year}, escaping without running code.`)
      process.exit(1);
  }

  // successful exit
  process.exit(0);
}




