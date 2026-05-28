import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module safe path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 130 Common Global First Names (Diverse pool for multinational operations)
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
  'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
  'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa', 'Timothy', 'Deborah',
  'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Cynthia', 'Ryan', 'Kathleen',
  'Jacob', 'Amy', 'Gary', 'Shirley', 'Nicholas', 'Anna', 'Eric', 'Angela', 'Jonathan', 'Ruth',
  'Stephen', 'Brenda', 'Larry', 'Pamela', 'Justin', 'Nicole', 'Scott', 'Katherine', 'Brandon', 'Samantha',
  'Benjamin', 'Christine', 'Samuel', 'Emma', 'Gregory', 'Catherine', 'Alexander', 'Debra', 'Frank', 'Rachel',
  'Patrick', 'Carolyn', 'Raymond', 'Janet', 'Jack', 'Maria', 'Dennis', 'Heather', 'Jerry', 'Helen',
  'Tyler', 'Catherine', 'Aaron', 'Diane', 'Jose', 'Julie', 'Adam', 'Victoria', 'Nathan', 'Joyce',
  'Henry', 'Lauren', 'Douglas', 'Kelly', 'Zachary', 'Christina', 'Peter', 'Ruth', 'Kyle', 'Joan',
  'Walter', 'Virginia', 'Ethan', 'Judith', 'Jeremy', 'Evelyn', 'Christian', 'Megan', 'Keith', 'Andrea'
];

// 130 Common Global Last Names 
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
  'Porter', 'Hunter', 'Jackson', 'Gaza', 'Yadav', 'Sharma', 'Kumar', 'Singh', 'Tanaka', 'Sato',
  'Suzuki', 'Takahashi', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato', 'Yoshida', 'Yamada',
  'Park', 'Choi', 'Jeong', 'Kang', 'Jo', 'Yoon', 'Lim', 'Han', 'Oh', 'Seo'
];

function createNamesInSrc() {
  // Target folder explicitly pointed to src/data/
  const targetSrcDataDir = path.join(__dirname, '../data');

  // 1. Ensure src/data directory is securely created if missing
  if (!fs.existsSync(targetSrcDataDir)) {
    fs.mkdirSync(targetSrcDataDir, { recursive: true });
  }

  // 2. Write both list blocks matching a clean single line entry format
  fs.writeFileSync(path.join(targetSrcDataDir, 'first_names.txt'), firstNames.join('\n'), 'utf-8');
  fs.writeFileSync(path.join(targetSrcDataDir, 'last_names.txt'), lastNames.join('\n'), 'utf-8');

  console.log(`✅ Success! Created first_names.txt and last_names.txt inside src/data/.`);
  console.log(`📝 Generated ${firstNames.length} first names and ${lastNames.length} last names.`);
}

createNamesInSrc();
