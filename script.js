const availableImagesGabriel = document.getElementById('availableImagesGabriel');
const availableImagesAnne = document.getElementById('availableImagesAnne');
const imageInput = document.getElementById('imageInput');
let draggedCardId = null;
let draggedCardPerson = null;

function createImageCard({ src, label, person, groupId, id }) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.draggable = true;
    card.dataset.id = id || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    card.dataset.groupId = groupId;
    card.dataset.person = person;
    card.innerHTML = `
        <img src="${src}" alt="${label}">
    `;

    card.addEventListener('dragstart', (event) => {
        draggedCardId = card.dataset.id;
        draggedCardPerson = card.dataset.person;
        event.dataTransfer.effectAllowed = 'move';
    });

    const container = person === 'gabriel' ? availableImagesGabriel : availableImagesAnne;
    container.appendChild(card);
    return card;
}

function moveCardToTarget(card, targetRow) {
    const itemsContainer = targetRow.querySelector('.tier-items');
    itemsContainer.appendChild(card);
    card.dataset.tier = targetRow.dataset.tier;
    saveStateToLocalStorage();
}

function returnCardToSource(card) {
    const person = card.dataset.person;
    const container = person === 'gabriel' ? availableImagesGabriel : availableImagesAnne;
    container.appendChild(card);
    delete card.dataset.tier;
    saveStateToLocalStorage();
}

function loadImagesFromFolder() {
    const folderImages = [
        "WhatsApp Image 2026-06-26 at 14.16.40 (1).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (10).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (11).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (12).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (13).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (14).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (15).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (16).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (17).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (18).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (19).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (2).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (20).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (21).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (22).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (23).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (24).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (25).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (26).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (27).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (28).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (29).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (3).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (30).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (31).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (32).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (33).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (34).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (35).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (36).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (37).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (38).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (39).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (4).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (40).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (41).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (42).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (43).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (44).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (45).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (46).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (47).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (5).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (6).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (7).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (8).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40 (9).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.40.jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (1).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (10).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (11).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (12).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (13).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (14).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (15).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (16).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (17).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (18).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (19).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (2).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (20).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (21).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (22).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (23).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (24).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (25).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (26).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (27).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (28).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (29).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (3).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (30).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (31).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (32).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (33).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (34).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (35).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (36).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (37).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (38).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (39).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (4).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (40).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (41).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (42).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (43).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (5).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (6).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (7).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (8).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41 (9).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.41.jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (1).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (2).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (3).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (4).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (5).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (6).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42 (7).jpeg",
        "WhatsApp Image 2026-06-26 at 14.16.42.jpeg"
    ];

    folderImages.forEach((fileName) => {
        const groupId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const src = encodeURI(`image/${fileName}`);

        createImageCard({ src, label: fileName, person: 'gabriel', groupId });
        createImageCard({ src, label: fileName, person: 'anne', groupId });
    });
    saveStateToLocalStorage();
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = loadStateFromLocalStorage();
    if (saved && saved.length) {
        restoreState(saved);
    } else {
        loadImagesFromFolder();
    }
});

document.addEventListener('dragover', (event) => {
    const dropZone = event.target.closest('.tier-row, #availableImagesGabriel, #availableImagesAnne');
    if (!dropZone) return;
    event.preventDefault();
    dropZone.classList.add('drag-over');
});

document.addEventListener('dragleave', (event) => {
    const dropZone = event.target.closest('.tier-row, #availableImagesGabriel, #availableImagesAnne');
    if (!dropZone) return;
    if (!dropZone.contains(event.relatedTarget)) {
        dropZone.classList.remove('drag-over');
    }
});

document.addEventListener('drop', (event) => {
    const dropZone = event.target.closest('.tier-row, #availableImagesGabriel, #availableImagesAnne');
    if (!dropZone || draggedCardId === null) return;
    event.preventDefault();
    dropZone.classList.remove('drag-over');

    const card = document.querySelector(`.image-card[data-id="${draggedCardId}"]`);
    if (!card) return;

    if (dropZone.id === 'availableImagesGabriel' || dropZone.id === 'availableImagesAnne') {
        // Voltando para a seção de imagens
        if (dropZone.id === 'availableImagesGabriel' && card.dataset.person === 'gabriel') {
            returnCardToSource(card);
        } else if (dropZone.id === 'availableImagesAnne' && card.dataset.person === 'anne') {
            returnCardToSource(card);
        }
    } else {
        // Movendo para uma linha de tier
        const tierPerson = dropZone.dataset.person;
        if (card.dataset.person === tierPerson) {
            moveCardToTarget(card, dropZone);
        }
    }

    draggedCardId = null;
    draggedCardPerson = null;
});

imageInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files || []);
    const groupId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    
    files.forEach((file) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
            // Criar card para Gabriel
            createImageCard({
                src: reader.result,
                label: file.name,
                person: 'gabriel',
                groupId: groupId
            });
            
            // Criar card duplicado para Anne
            createImageCard({
                src: reader.result,
                label: file.name,
                person: 'anne',
                groupId: groupId
            });
            saveStateToLocalStorage();
        };
        reader.readAsDataURL(file);
    });
    event.target.value = '';
});

const saveStateButton = document.getElementById('saveStateButton');
const loadStateButton = document.getElementById('loadStateButton');
const stateInput = document.getElementById('stateInput');

function getCurrentState() {
    const cards = Array.from(document.querySelectorAll('.image-card'));
    return cards.map((card) => ({
        id: card.dataset.id,
        groupId: card.dataset.groupId,
        person: card.dataset.person,
        tier: card.dataset.tier || null,
        src: card.querySelector('img').src,
        label: card.querySelector('img').alt
    }));
}

function saveStateToLocalStorage() {
    const state = getCurrentState();
    window.localStorage.setItem('tierListState', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
    const raw = window.localStorage.getItem('tierListState');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function clearAllCards() {
    availableImagesGabriel.innerHTML = '';
    availableImagesAnne.innerHTML = '';
    document.querySelectorAll('.tier-items').forEach((container) => container.innerHTML = '');
}

function restoreState(state) {
    clearAllCards();
    state.forEach((item) => {
        const card = createImageCard({
            id: item.id,
            src: item.src,
            label: item.label,
            person: item.person,
            groupId: item.groupId
        });
        if (item.tier) {
            const targetRow = document.querySelector(`.tier-row[data-person="${item.person}"][data-tier="${item.tier}"]`);
            if (targetRow) moveCardToTarget(card, targetRow);
        }
    });
}

function restoreStateFromLocalStorage() {
    const state = loadStateFromLocalStorage();
    if (state) {
        restoreState(state);
    }
}

saveStateButton.addEventListener('click', () => {
    const state = getCurrentState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tierlist-state.json';
    a.click();
    URL.revokeObjectURL(url);
});

loadStateButton.addEventListener('click', () => {
    stateInput.click();
});

stateInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const state = JSON.parse(reader.result);
            restoreState(state);
        } catch (error) {
            alert('Arquivo inválido.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
});
