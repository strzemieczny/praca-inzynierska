document.addEventListener("DOMContentLoaded", function () {
    const bakcup = document.getElementById('backup');
    const header = document.getElementById('header-text');
    bakcup.addEventListener('mouseover', () => {
        header.innerHTML = 'Backup Monitor'
    });
    bakcup.addEventListener('mouseout', () => {
        header.innerHTML = 'PDS Apps'
    });
});