class SiteEntry {
    constructor(name, minutes, category) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.minutes = minutes;
        this.category = category;
    }
}

class Store {
    static getEntries() {
        let entries;
        if(localStorage.getItem('entries') === null) {
            entries = [];
        } else {
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }

    static addEntry(entry) {
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    static removeEntry(id) {
        console.log('ID RECEIVED:', id);

        const entries = Store.getEntries();
        console.log('ENTRIES:', entries);

        const filteredEntries = entries.filter(entry => entry.id !== id);
        console.log('FILTERED:', filteredEntries);

        localStorage.setItem('entries', JSON.stringify(filteredEntries));
    }
}

class UI {
    static displayList() {
        // const storedEntries = [
        //     {
        //         name: 'sample.com',
        //         minutes: 23,
        //         category: 'Productive'
        //     },
        //     {
        //         name: 'sample-two.com',
        //         minutes: 23,
        //         category: 'Unproductive'
        //     }
        // ];

        // const entries = storedEntries;
        const entries = Store.getEntries();

        entries.forEach((entry) => UI.addEntryToList(entry));
        
    }

    static addEntryToList(entry) {
        const list = document.getElementById('entry-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.minutes}</td>
            <td>${entry.category}</td>
            <td><a href="#" class="delete" data-id="${entry.id}">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.getElementById('site-name').value = '';
        document.getElementById('min-duration').value = '';
        document.querySelector('input[name="site-category"]:checked');
    }

    static deleteEntry(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', UI.displayList);

document.getElementById('website-entry-form').addEventListener('submit', (e) => {
    // delete after
    e.preventDefault();

    // get values inputted
    const name = document.getElementById('site-name').value;
    const minutes = Number(document.getElementById('min-duration').value);
    const checkedCategory = document.querySelector('input[name="site-category"]:checked');

    // validation before values get submitted
    const noRadioButtonsChecked = !document.querySelector('input[name="site-category"]:checked');
    if(name === '' || Number.isNaN(minutes) || !checkedCategory) {
        alert('Plase fill in all fields.');
    } else {
        const category = checkedCategory.value;

        // instantiate entry
        const entry = new SiteEntry(name, minutes, category);

        // add entry to ui
        UI.addEntryToList(entry);

        // add book to localstorage
        Store.addEntry(entry);

        // UI.clearFields();
        e.target.reset();
    }
});

// remove a book
document.getElementById('entry-list').addEventListener('click', (e) => {
    // remove from ui
    UI.deleteEntry(e.target);

    // remove book from localstorage
    if(e.target.matches('.delete')) {
        Store.removeEntry(e.target.dataset.id);
    }
});