document.addEventListener('DOMContentLoaded', () => {
    const sidebarList = document.querySelector('.solution-list');
    const contentView = document.getElementById('content-view');
    const emptyState = document.getElementById('empty-state');
    const codeContainer = document.querySelector('.code-container code');
    const flowTableBody = document.querySelector('#flow-table tbody');
    const flowTableHeader = document.querySelector('#flow-table thead tr');
    const flowPanel = document.getElementById('flow-panel');
    const journalView = document.getElementById('journal-view');
    const timelineContainer = document.getElementById('timeline-container');
    const btnJournal = document.getElementById('btn-journal');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'All';

    // Use the global SOLUTIONS object defined in data.js
    if (typeof SOLUTIONS !== 'undefined') {
        renderSidebar(SOLUTIONS);
    } else {
        sidebarList.innerHTML = '<div class="error" style="color: var(--hard-color); padding: 20px;">Error: data.js not found.</div>';
    }

    if (typeof JOURNAL_DATA !== 'undefined') {
        renderJournal(JOURNAL_DATA);
    }

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderSidebar(SOLUTIONS);
        });
    });

    // Journal Logic
    btnJournal.addEventListener('click', () => {
        document.querySelectorAll('.solution-item').forEach(i => i.classList.remove('active'));
        btnJournal.classList.add('active');
        contentView.classList.remove('active');
        journalView.classList.add('active');
    });

    function renderSidebar(data) {
        sidebarList.innerHTML = '';
        ['Easy', 'Medium', 'Hard'].forEach(difficulty => {
            if (currentFilter !== 'All' && currentFilter !== difficulty) return;

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

    function loadSolution(item, element) {
        // Toggle active class
        document.querySelectorAll('.solution-item').forEach(i => i.classList.remove('active'));
        element.classList.add('active');
        btnJournal.classList.remove('active');

        // Show code view, hide journal
        journalView.classList.remove('active');
        contentView.classList.add('active');
        contentView.classList.remove('animate-fade');
        void contentView.offsetWidth; // Trigger reflow
        contentView.classList.add('animate-fade');

        // Set Headers
        document.getElementById('display-title').textContent = item.title;
        const badge = document.getElementById('display-difficulty');
        badge.textContent = item.difficulty;
        badge.className = `badge badge-${item.difficulty.toLowerCase()}`;

        // Get content directly from embedded data (No Fetch!)
        const text = item.content || '// Content not found.';

        // 1. Extract Description
        // Match up to the flow table separator "* ---" OR the end of the JSDoc block "*/"
        const descMatch = text.match(/\/\*\*([\s\S]*?)(?:\* ---|\*\/)/);
        let description = descMatch ? descMatch[1].replace(/\n \*/g, '\n').trim() : 'No description found.';
        
        // Remove the "Problem #X: Title" line if it exists at the start
        description = description.replace(/^.*?Problem #\d+:.*?\n+/, '').replace(/^\* /gm, '');
        
        // Use the first paragraph of the actual description
        document.getElementById('display-description').textContent = description.split('\n\n')[0].trim();

        // 2. Extract Flow Table
        // Match either JSDoc style or markdown style
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

        // Scroll to top of content
        contentView.scrollTop = 0;
    }

    function renderMarkdownTable(md) {
        // Filter rows that look like table lines
        const rows = md.split('\n')
            .map(r => r.trim())
            .filter(r => r.startsWith('|') && r.endsWith('|') && !r.includes('---'));
            
        if (rows.length < 1) return;

        // Headers
        const headers = rows[0].split('|').map(h => h.trim()).filter(h => h !== '');
        flowTableHeader.innerHTML = headers.map(h => `<th>${h}</th>`).join('');

        // Body
        const bodyRows = rows.slice(1);
        const bodyContent = bodyRows.map(row => {
            const cells = row.split('|').map(c => c.trim()).filter(c => c !== '');
            if (cells.length === 0) return '';
            return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
        }).join('');
        flowTableBody.innerHTML = bodyContent;
    }

    function renderJournal(data) {
        timelineContainer.innerHTML = '';
        data.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            // Simple markdown parser for the journal content
            let parsedContent = entry.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-blue)">$1</a>')
                .replace(/\n- (.*?)(?=\n|$)/g, '<li>$1</li>');
                
            // Wrap lists
            parsedContent = parsedContent.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
            // Line breaks
            parsedContent = parsedContent.replace(/\n\n/g, '<br><br>');

            item.innerHTML = `
                <div class="timeline-header">
                    <h3>${entry.title}</h3>
                </div>
                <div class="timeline-content">
                    ${parsedContent}
                </div>
            `;
            timelineContainer.appendChild(item);
        });
    }
});
