const fs = require('fs');
const inquirer = require('inquirer');
const SVG = require('svg.js');

// Function to generate the logo SVG
function generateLogo(color, shape, text) {
  const svgWidth = 200;
  const svgHeight = 100;

  // Create SVG canvas
  const canvas = SVG(svgWidth, svgHeight);

  // Set background color
  canvas.rect(svgWidth, svgHeight).fill(color);

  // Add shape based on user selection
  if (shape === 'circle') {
    canvas.circle(50).move(75, 25).fill('#ffffff').stroke({ width: 2, color: '#000000' });
  } else if (shape === 'square') {
    canvas.rect(60, 60).move(70, 20).fill('#ffffff').stroke({ width: 2, color: '#000000' });
  }

  // Add text to the logo
  canvas.text(text).move(80, 70).font({ size: 20, family: 'Arial', anchor: 'middle' });

  return canvas.svg();
}

// Function to prompt user for inputs
function getUserInputs() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'color',
      message: 'Select a color for your logo:',
      choices: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for your logo:',
      choices: ['circle', 'square'],
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for your logo:',
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Enter the filename to save the SVG:',
      default: 'logo.svg',
    },
  ]);
}

// Main function to run the application
async function run() {
  try {
    const userInput = await getUserInputs();
    const { color, shape, text, filename } = userInput;

    const logoSVG = generateLogo(color, shape, text);

    // Save generated SVG to a file
    fs.writeFileSync(filename, logoSVG);
    console.log(`Logo generated successfully! Saved as ${filename}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the application
run();
