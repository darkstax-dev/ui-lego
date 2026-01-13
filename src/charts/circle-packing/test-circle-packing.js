// Simple test to verify CirclePackingChart data structure
const testData = {
  id: 'root',
  children: [
    {
      id: 'Frontend',
      children: [
        { id: 'React', value: 45 },
        { id: 'Vue', value: 28 },
        { id: 'Angular', value: 22 },
        { id: 'Svelte', value: 15 },
      ],
    },
    {
      id: 'Backend',
      children: [
        { id: 'Node.js', value: 38 },
        { id: 'Python', value: 35 },
        { id: 'Java', value: 32 },
        { id: 'Go', value: 18 },
        { id: 'Rust', value: 12 },
      ],
    },
  ],
};

console.log('Test data structure:');
console.log(JSON.stringify(testData, null, 2));

// Validate data structure
function validateCirclePackingData(data) {
  if (!data.id) {
    console.error('Missing id property');
    return false;
  }
  
  if (data.children) {
    if (!Array.isArray(data.children)) {
      console.error('children must be an array');
      return false;
    }
    
    for (const child of data.children) {
      if (!validateCirclePackingData(child)) {
        return false;
      }
    }
  } else if (typeof data.value !== 'number') {
    console.error('Leaf nodes must have a numeric value');
    return false;
  }
  
  return true;
}

console.log('Data validation:', validateCirclePackingData(testData) ? 'PASSED' : 'FAILED');
