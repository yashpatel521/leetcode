const fs = require('fs');
const path = require('path');

const folders = ['Easy', 'Medium', 'Hard'];
const repoRoot = path.join(__dirname, '..');
const outputFile = path.join(repoRoot, 'data.js'); // Outputting to data.js for global access

const solutions = {
    Easy: [],
    Medium: [],
    Hard: []
};

folders.forEach(folder => {
    const folderPath = path.join(repoRoot, folder);
    if (!fs.existsSync(folderPath)) return;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
    
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Match the problem header, e.g., "Problem #2: Add Two Numbers (Medium)"
        const titleMatch = content.match(/\* Problem #(\d+): (.*?) \((.*?)\)/);
        
        const solution = {
            id: '',
            title: '',
            difficulty: folder,
            file: `${folder}/${file}`,
            content: content // Embedding the full content to bypass CORS/Fetch restrictions
        };

        if (titleMatch) {
            solution.id = titleMatch[1];
            solution.title = titleMatch[2];
            solution.difficulty = titleMatch[3];
        } else {
            // Fallback for files without the perfect header
            const nameParts = file.replace('.js', '').split('_');
            solution.id = nameParts[0] || '?';
            solution.title = nameParts.slice(1).join(' ').replace(/([A-Z])/g, ' $1').trim();
        }

        solutions[folder].push(solution);
    });

    // Sort by ID
    solutions[folder].sort((a, b) => {
        const idA = parseInt(a.id);
        const idB = parseInt(b.id);
        if (isNaN(idA)) return 1;
        if (isNaN(idB)) return -1;
        return idA - idB;
    });
});

// Parse JOURNAL.md
const journalPath = path.join(repoRoot, 'JOURNAL.md');
let journalData = [];
if (fs.existsSync(journalPath)) {
    const journalContent = fs.readFileSync(journalPath, 'utf-8');
    // Split by day headers "## Day X:"
    const dayBlocks = journalContent.split(/^## /m).filter(b => b.startsWith('Day'));
    
    dayBlocks.forEach(block => {
        // e.g., "Day 3: March 29, 2026\n**Problems Solved..."
        const lines = block.split('\n');
        const titleLine = lines[0].trim(); // "Day 3: March 29, 2026"
        
        const contentMarkdown = lines.slice(1).join('\n').trim();
        journalData.unshift({
            title: titleLine,
            content: contentMarkdown
        });
    });
}

// Output as a JavaScript file with global variables
const jsFileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * This file contains all your LeetCode solution data for the interactive dashboard.
 */
const SOLUTIONS = ${JSON.stringify(solutions, null, 2)};
const JOURNAL_DATA = ${JSON.stringify(journalData, null, 2)};`;

fs.writeFileSync(outputFile, jsFileContent);
console.log(`Generated ${outputFile} with ${Object.values(solutions).flat().length} solutions and ${journalData.length} journal entries embedded.`);
