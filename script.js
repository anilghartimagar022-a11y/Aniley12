document.addEventListener('DOMContentLoaded', () => {

    // Helper to generate unique IDs
    const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

    const initialMemories = [
        {
            id: generateUniqueId(),
            title: "A cherished memory from the past",
            description: "Look what I found! A beautiful memory from our old stories. Time may pass, but the feelings remain. So glad we have these moments to look back on.",
            imageUrl: "anil1.png"
        },
        {
            id: generateUniqueId(),
            title: "Our First Date",
            description: "That magical evening where it all began. I'll never forget the sparkle in your eyes.",
            imageUrl: "https://picsum.photos/seed/picsum1/400/300"
        },
        {
            id: generateUniqueId(),
            title: "Spontaneous Road Trip",
            description: "Singing along to our favorite songs on the open road. Best adventure ever.",
            imageUrl: "https://picsum.photos/seed/picsum2/400/300"
        },
        {
            id: generateUniqueId(),
            title: "Cozy Movie Nights",
            description: "Just being with you, a warm blanket, and a good movie is my favorite place to be.",
            imageUrl: "https://picsum.photos/seed/picsum3/400/300"
        }
    ];

    let memories = [...initialMemories];

    // --- Photo Gallery Data (using your detected files) ---
    const initialGalleryPhotos = [
        "justhey1.jpeg",
        "justhey2.jpeg",
        "anil12.png",
        "justhey3.jpeg",
        "justhey4.jpeg",
        "IMG_0576.JPG",
        "IMG_2230.JPG",
        "IMG_2246.JPG",
        "IMG_9797.JPG",
    ];


    const timeline = document.getElementById('timeline');
    const memoryCardTemplate = document.getElementById('memory-card-template');
    const addMemoryForm = document.getElementById('add-memory-form');

    const createMemoryCard = (memory) => {
        const card = memoryCardTemplate.content.cloneNode(true).firstElementChild;
        card.dataset.id = memory.id; // Store memory ID on the card element

        card.querySelector('.memory-image').src = memory.imageUrl || 'https://via.placeholder.com/400x300';
        card.querySelector('.memory-image').alt = memory.title;
        card.querySelector('.memory-title').textContent = memory.title;
        card.querySelector('.memory-description').textContent = memory.description;

        // Add event listeners for Delete and Edit buttons
        const deleteButton = card.querySelector('.delete-memory-btn');
        deleteButton.addEventListener('click', () => deleteMemory(memory.id));

        const editButton = card.querySelector('.edit-memory-btn');
        editButton.addEventListener('click', () => editMemory(memory.id)); // Placeholder for edit

        return card;
    };

    const renderMemories = () => {
        timeline.innerHTML = '';
        memories.forEach(memory => {
            const card = createMemoryCard(memory);
            timeline.appendChild(card);
        });
    };

    const deleteMemory = (id) => {
        memories = memories.filter(memory => memory.id !== id);
        renderMemories(); // Re-render after deletion
    };

    const editMemory = (id) => {
        // This function will be implemented in a later step
        console.log('Edit memory with ID:', id);
        alert('Edit functionality coming soon!');
    };


    addMemoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('memory-title');
        const descriptionInput = document.getElementById('memory-description');
        const imageUrlInput = document.getElementById('memory-image-url');

        const newMemory = {
            id: generateUniqueId(), // Assign a unique ID
            title: titleInput.value,
            description: descriptionInput.value,
            imageUrl: imageUrlInput.value || `https://picsum.photos/seed/${Date.now()}/400/300`
        };

        memories.unshift(newMemory);
        renderMemories();

        addMemoryForm.reset();
    });

    // Initial render of memories
    renderMemories();


    // --- Photo Gallery Logic ---
    const photoGallery = document.getElementById('photo-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    const renderGalleryPhotos = () => {
        photoGallery.innerHTML = ''; // Clear existing photos before re-rendering
        initialGalleryPhotos.forEach((url, index) => { // Pass index for delete
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('overflow-hidden', 'rounded-lg', 'shadow-md', 'relative', 'group'); // Add relative and group
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = "Gallery Photo";
            img.classList.add('gallery-image'); // Custom class for styling
            
            imgContainer.appendChild(img);
            photoGallery.appendChild(imgContainer);

            // Overlay for delete/edit buttons
            const overlay = document.createElement('div');
            overlay.classList.add('absolute', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'duration-300', 'space-x-2');
            
            const deleteGalleryButton = document.createElement('button');
            deleteGalleryButton.textContent = 'Delete';
            deleteGalleryButton.classList.add('bg-red-500', 'text-white', 'px-3', 'py-1', 'rounded-md', 'hover:bg-red-600', 'transition-colors', 'z-20');
            deleteGalleryButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent opening lightbox
                deleteGalleryPhoto(index);
            });
            overlay.appendChild(deleteGalleryButton);

            const editGalleryButton = document.createElement('button');
            editGalleryButton.textContent = 'Edit';
            editGalleryButton.classList.add('bg-blue-500', 'text-white', 'px-3', 'py-1', 'rounded-md', 'hover:bg-blue-600', 'transition-colors', 'z-20');
            editGalleryButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent opening lightbox
                editGalleryPhoto(index); // Placeholder for edit
            });
            overlay.appendChild(editGalleryButton);

            imgContainer.appendChild(overlay);

            img.addEventListener('click', () => {
                lightboxImage.src = url;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex'); // Use flex to center
            });
        });
    };

    const deleteGalleryPhoto = (index) => {
        initialGalleryPhotos.splice(index, 1); // Remove from array
        renderGalleryPhotos(); // Re-render gallery
    };

    const editGalleryPhoto = (index) => {
        // Placeholder for gallery edit functionality
        console.log('Edit gallery photo at index:', index);
        alert('Gallery Edit functionality coming soon!');
    };


    renderGalleryPhotos(); // Render gallery photos on load

    // --- Lightbox Logic ---
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Close when clicking outside image
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
        }
    });

});