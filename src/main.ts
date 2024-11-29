import run_2018 from './2018'
import run_2019 from './2019'
import readFile from './helpers/readFile'

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Invalid inputs, required format is "npm start <year> <day>"');
  process.exit(1);
}

async function run (year: number, day: number) {
  const padded_day = day.toString().padStart(2, '0');
  const input_line = await readFile(`src/inputs/${year}/day_${padded_day}.txt`);
  if (!input_line) { 
    console.error(`Unable to read input from /inputs/${year}/day_${padded_day}.txt`);
    process.exit(1);
  }

  const input = input_line.split(/\r?\n/).map(line => line.trim());
  console.log(`Running problem ${padded_day} for year ${year}:`);

  switch (year) {
    case 2018: 
      run_2018(day, input);
      break;

    case 2019: 
      run_2019(day, input);
      break;
  
    default:
      console.error(`Unable to find year ${year}, escaping without running code.`)
      process.exit(1);
  }

  // successful exit
  process.exit(0);
}

run(parseInt(args[0]), parseInt(args[1]));
