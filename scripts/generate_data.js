const fs = require('fs');
const path = require('path');

const folders = ['Easy', 'Medium', 'Hard'];
const repoRoot = path.join(__dirname, '..');
const outputFile = path.join(repoRoot, 'solutions.json');

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
        
        if (titleMatch) {
            solutions[folder].push({
                id: titleMatch[1],
                title: titleMatch[2],
                difficulty: titleMatch[3],
                file: `${folder}/${file}`
            });
        } else {
            // Fallback for files without the perfect header
            const nameParts = file.replace('.js', '').split('_');
            solutions[folder].push({
                id: nameParts[0] || '?',
                title: nameParts.slice(1).join(' ').replace(/([A-Z])/g, ' $1').trim(),
                difficulty: folder,
                file: `${folder}/${file}`
            });
        }
    });

    // Sort by ID
    solutions[folder].sort((a, b) => parseInt(a.id) - parseInt(b.id));
});

fs.writeFileSync(outputFile, JSON.stringify(solutions, null, 2));
console.log(`Generated ${outputFile} with ${Object.values(solutions).flat().length} solutions.`);
