document.addEventListener("DOMContentLoaded", function () {
    const bakcup = document.getElementById('backup');
    const fazit = document.getElementById('fazit');
    const header = document.getElementById('header-text');
    bakcup.addEventListener('mouseover', () => {
        header.innerHTML = 'Backup Monitor'
    });
    
    bakcup.addEventListener('mouseout', () => {
        header.innerHTML = 'PDS Apps'
    });

    fazit.addEventListener('mouseover', () => {
        header.innerHTML = 'FAZIT'
    });

    fazit.addEventListener('mouseout', () => {
        header.innerHTML = 'PDS Apps'
    });
});