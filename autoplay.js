(function() {
    let isAutoplayEnabled = true;

    // Trouver le prochain lien dans la liste
    function findNextLink() {
        const currentLink = document.querySelector('.cp-video-training_chapter.-current');
        if (currentLink) {
            let nextLink = currentLink.nextElementSibling;
            while (nextLink && (
                !nextLink.classList.contains('cp-video-training_chapter') ||
                nextLink.classList.contains('cp-text-training_chapter')
            )) {
                nextLink = nextLink.nextElementSibling;
            }
            return nextLink;
        }
        return null;
    }

    // Cliquer sur le prochain lien
    function clickNextLink() {
        const nextLink = findNextLink();
        if (nextLink && isAutoplayEnabled) {
            console.log('Passage à la vidéo suivante...');
            nextLink.click();
        }
    }

    // Ajouter un bouton pour activer/désactiver l'autoplay
    function addAutoplayToggle() {
        const oldButton = document.getElementById('autoplay-toggle');
        if (oldButton) oldButton.remove();

        const container = document.querySelector('.col');
        if (container) {
            const button = document.createElement('button');
            button.id = 'autoplay-toggle';
            button.style.cssText = 'position: absolute; top: 10px; right: 10px; z-index: 1000; padding: 5px 10px; background: rgba(169, 142, 255, 0.85); color: white; border: none; border-radius: 4px; cursor: pointer;';
            button.textContent = 'Autoplay: ON';
            
            button.addEventListener('click', () => {
                isAutoplayEnabled = !isAutoplayEnabled;
                button.textContent = `Autoplay: ${isAutoplayEnabled ? 'ON' : 'OFF'}`;
                console.log(`Autoplay ${isAutoplayEnabled ? 'activé' : 'désactivé'}`);
            });
            
            container.style.position = 'relative';
            container.appendChild(button);
        }
    }

    // Configuration de Wistia
    window._wq = window._wq || [];
    window._wq.push({
        id: '_all',
        onReady: function(video) {
            console.log('Vidéo détectée, configuration de l\'autoplay...');
            
            // Gérer la fin de la vidéo
            video.bind('end', function() {
                console.log('Vidéo terminée');
                if (isAutoplayEnabled) {
                    setTimeout(clickNextLink, 1000);
                }
            });

            // Démarrer la vidéo si elle n'est pas en lecture
            if (video.state() !== 'playing') {
                video.play().catch(function(error) {
                    console.log('Impossible de démarrer la vidéo automatiquement. Cliquez pour commencer.');
                });
            }
        }
    });

    // Initialisation
    addAutoplayToggle();
    console.log('Script d\'autoplay initialisé');
})();
