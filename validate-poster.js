const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const count = (pattern) => {
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
};

const classTokenCount = (token) => {
  const classAttributes = html.match(/class="[^"]*"/g) || [];
  return classAttributes.filter((attribute) => {
    const classes = attribute.slice(7, -1).split(/\s+/);
    return classes.includes(token);
  }).length;
};

const posterElements = classTokenCount('poster');
const referencePlaceholderText = ['INSERT', 'FULL', 'REFERENCE', 'DETAILS'].join(' ');
const aiExposurePlaceholderText = ['INSERT', 'VERIFIED', 'AI-EXPOSURE', 'COEFFICIENTS', 'AND', 'P-VALUES', 'FROM', 'THE', 'THESIS'].join(' ');
const referencePlaceholders = count(new RegExp(referencePlaceholderText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
const aiExposurePlaceholders = count(new RegExp(aiExposurePlaceholderText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
const oneToSevenLabels = count(new RegExp('1[\\u2013-]7|Rating\\s*\\(1[\\u2013-]7\\)|Mean Rating\\s*\\(1[\\u2013-]7\\)', 'g'));
const figureContainers = count(/class="[^"]*\bresult-figure\b[^"]*"/g);
const completeReferenceItems = count(/class="reference-item"/g);
const stylesheetLink = /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>/.test(html);
const printButtonScreenOnly = /class="[^"]*\bprint-button\b[^"]*\bscreen-only\b[^"]*"|class="[^"]*\bscreen-only\b[^"]*\bprint-button\b[^"]*"/.test(html);

const results = {
  'poster elements': posterElements,
  'reference placeholders': referencePlaceholders,
  'AI-exposure placeholders': aiExposurePlaceholders,
  'one-to-seven labels': oneToSevenLabels,
  'figure containers': figureContainers,
  'complete reference items': completeReferenceItems,
  'stylesheet link present': stylesheetLink,
  'Print button screen-only': printButtonScreenOnly,
};

for (const [label, value] of Object.entries(results)) {
  console.log(`${label}: ${value}`);
}

const ok =
  posterElements === 1 &&
  referencePlaceholders === 0 &&
  aiExposurePlaceholders === 0 &&
  oneToSevenLabels === 0 &&
  figureContainers >= 2 &&
  completeReferenceItems === 10 &&
  stylesheetLink &&
  printButtonScreenOnly;

process.exit(ok ? 0 : 1);
