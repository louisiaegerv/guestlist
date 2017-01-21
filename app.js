const form = document.querySelector('#registrar');
const input = document.querySelector('#registrar input');
const inviteButton = document.querySelector('#registrar button');
const mainDiv = document.querySelector('.main');
const ul = document.querySelector('#invitedList');
const filterDiv = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');
filterLabel.textContent = 'Hide those who haven\'t been confirmed';
filterCheckbox.classList.add('filterCheckbox');
filterCheckbox.type = 'checkbox';
filterLabel.appendChild(filterCheckbox);
filterDiv.appendChild(filterLabel);
mainDiv.insertBefore(filterDiv, ul);
// ---- Functions ---- //
const supportsLocalStorage = () => {
    try {
        return 'localStorage' in window && window['localstorage'] !== null;
    }
    catch (e) {
        return false;
    }
};
const getLocalStorage = () => {
    let guests = localStorage.getItem('guests');
    //console.log(guests);
    if (guests) {
        return JSON.parse(guests);
    }
    return [];
}
const saveToLocalStorage = (guestName) => {
    let guests = getLocalStorage();
    if (!guestName && guests.indexOf(guestName) > -1) {
        return false;
    }
    guests.push(guestName);
    localStorage.setItem('guests', JSON.stringify(guests));
    return true;
}
const removeLocalStorageList = () => {
    localStorage.removeItem('guests');
}
const removeGuestFromLocalStorage = (guestName) => {
    
}

const createLI = (name) => {
    const createElement = (elementName, property, value) => {
        const element = document.createElement(elementName);
        element[property] = value;
        return element;
    };
    const appendToLI = (elementName, property, value) => {
        const element = createElement(elementName, property, value);
        li.appendChild(element);
        return element;
    };
    const li = document.createElement('li');
    ul.appendChild(li);
    appendToLI('span', 'textContent', name);
    appendToLI('label', 'textContent', 'Confirmed').appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
};
window.onload = () => {
    // ---- Event Listeners ---- //
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value != '') {
            let personName = input.value;
            input.value = '';
            input.focus();
            saveToLocalStorage(personName);
            createLI(personName);
        }
    });
    ul.addEventListener('change', (e) => {
        if (e.target.type == 'checkbox') {
            //dom traversal from checkbox > label > li
            e.target.parentNode.parentNode.classList.toggle('responded');
        }
    });
    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = event.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent;
            const guests = getLocalStorage();
            //console.log(guests);
            
            const nameActions = {
                    remove: () => {
                        let name = li.firstElementChild.textContent;
                        console.log(name + " has been removed.");
                        let guests = getLocalStorage();
                        let guestIndex = guests.indexOf(name);
                        console.log(guestIndex);
                        let removedGuest = guests.splice(guestIndex, 1);
                        console.log(removedGuest);
                        localStorage.setItem('guests', JSON.stringify(guests));
                        ul.removeChild(li);
                    }
                    , edit: () => {
                        button.textContent = 'save';
                        const span = li.firstElementChild;
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.value = span.textContent;
                        li.insertBefore(input, span);
                        li.removeChild(span);
                        input.focus();
                    }
                    , save: () => {
                        button.textContent = 'edit';
                        const input = li.firstElementChild;
                        const span = document.createElement('span');
                        span.textContent = input.value;
                        li.insertBefore(span, input);
                        li.removeChild(input);
                    }
                }
                //select and run action in buttons name
            nameActions[action]();
        }
    });
    filterCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        let lis = ul.children;
        if (isChecked) {
            for (let i = 0; i < lis.length; i++) {
                let li = lis[i];
                if (li.className === 'responded') {
                    li.style.display = '';
                }
                else {
                    li.style.display = 'none';
                }
            }
        }
        else {
            for (let i = 0; i < lis.length; i++) {
                let li = lis[i];
                li.style.display = '';
            }
        }
    });
    
    //Get localstorage guests and display at start
    getLocalStorage().forEach((guest) => {
        createLI(guest);
    });
};