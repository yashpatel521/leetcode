document.addEventListener('DOMContentLoaded', async () => {
    const sidebarList = document.querySelector('.solution-list');
    const contentView = document.getElementById('content-view');
    const emptyState = document.getElementById('empty-state');
    const codeContainer = document.querySelector('.code-container code');
    const flowTableBody = document.querySelector('#flow-table tbody');
    const flowTableHeader = document.querySelector('#flow-table thead tr');
    const flowPanel = document.getElementById('flow-panel');

    let solutions = {};

    try {
        const response = await fetch('solutions.json');
        solutions = await response.json();
        renderSidebar(solutions);
    } catch (err) {
        console.error('Error loading solutions:', err);
    }

    function renderSidebar(data) {
        sidebarList.innerHTML = '';
        ['Easy', 'Medium', 'Hard'].forEach(difficulty => {
            if (data[difficulty] && data[difficulty].length > 0) {
                const catTitle = document.createElement('div');
                catTitle.className = 'category-title';
                catTitle.textContent = difficulty;
                sidebarList.appendChild(catTitle);

                data[difficulty].forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'solution-item';
                    el.innerHTML = `
                        <span class="solution-id">${item.id}</span>
                        <span class="solution-title">${item.title}</span>
                    `;
                    el.onclick = () => loadSolution(item, el);
                    sidebarList.appendChild(el);
                });
            }
        });
    }

    async function loadSolution(item, element) {
        // Toggle active class
        document.querySelectorAll('.solution-item').forEach(i => i.classList.remove('active'));
        element.classList.add('active');

        // Show view
        emptyState.style.display = 'none';
        contentView.classList.add('active');
        contentView.classList.remove('animate-fade');
        void contentView.offsetWidth; // Trigger reflow
        contentView.classList.add('animate-fade');

        // Set Headers
        document.getElementById('display-title').textContent = item.title;
        const badge = document.getElementById('display-difficulty');
        badge.textContent = item.difficulty;
        badge.className = `badge badge-${item.difficulty.toLowerCase()}`;

        try {
            const response = await fetch(item.file);
            const content = await response.json(); // Wait, it's a JS file, not JSON
            // Correction: fetch actually returns the text if we use .text()
        } catch (e) {}

        const res = await fetch(item.file);
        const text = await res.text();

        // 1. Extract Description
        const descMatch = text.match(/\/\*\*([\s\S]*?)\* ---/);
        const description = descMatch ? descMatch[1].replace(/\n \*/g, '\n').trim() : 'No description found.';
        document.getElementById('display-description').textContent = description.split('\n\n')[0].replace(/^\* /gm, '');

        // 2. Extract Flow Table
        const tableMatch = text.match(/### Execution Flow Table([\s\S]*?)\*\/|### Execution Flow Table([\s\S]*?)```/);
        if (tableMatch) {
            flowPanel.style.display = 'block';
            const tableText = (tableMatch[1] || tableMatch[2]).trim();
            renderMarkdownTable(tableText);
        } else {
            flowPanel.style.display = 'none';
        }

        // 3. Extract Code (strip the leading JSDoc)
        const code = text.replace(/\/\*\*[\s\S]*?\*\//, '').trim();
        codeContainer.textContent = code;
        Prism.highlightElement(codeContainer);
    }

    function renderMarkdownTable(md) {
        const rows = md.split('\n').filter(r => r.includes('|') && !r.includes('---'));
        if (rows.length < 2) return;

        // Headers
        const headers = rows[0].split('|').map(h => h.trim()).filter(h => h !== '');
        flowTableHeader.innerHTML = headers.map(h => `<th>${h}</th>`).join('');

        // Body
        const bodyContent = rows.slice(1).map(row => {
            const cells = row.split('|').map(c => c.trim()).filter(c => c !== '');
            if (cells.length === 0) return '';
            return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
        }).join('');
        flowTableBody.innerHTML = bodyContent;
    }
});
