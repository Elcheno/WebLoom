const seed = require('./seed.js');
const drop = require('./drop.js');
const create = require('./create.js');

async function main() {
  await drop();
  // await create();
  // await seed();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
})
