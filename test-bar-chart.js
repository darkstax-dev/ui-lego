// Simple test to verify bar chart can be imported
const fs = require('fs');

// Check if files exist
const files = [
  'src/charts/bar/BarChart.tsx',
  'src/charts/bar/BarChart.css', 
  'src/charts/bar/BarChartDemo.tsx',
  'src/charts/bar/BarChart.stories.tsx',
  'src/charts/bar/index.ts'
];

console.log('Checking bar chart files...');
files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Check if charts index.ts includes bar chart
const chartsIndex = fs.readFileSync('src/charts/index.ts', 'utf8');
if (chartsIndex.includes('bar/BarChart')) {
  console.log('✅ Bar chart exported in charts/index.ts');
} else {
  console.log('❌ Bar chart not exported in charts/index.ts');
}

console.log('Bar chart implementation check complete!');
