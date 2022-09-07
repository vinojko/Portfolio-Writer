document.getElementById('pubButton').addEventListener('click', async() => {
    var name = document.getElementById('namepub').value;
    var authors = document.getElementById('authorspub').value;
    var publisher = document.getElementById('publisherpub').value;
    var date = document.getElementById('datepub').value;

    await eel.send_publication(name, authors, publisher, date);
})