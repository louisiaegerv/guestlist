const form = document.querySelector('#registrar');
const input = document.querySelector('#registrar input');
const inviteButton = document.querySelector('#registrar button');
const ul = document.querySelector('#invitedList');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value != '') {
        let personName = input.value;
        //guests.push(personName);
        input.value = '';
        input.focus();
        createLI(personName);
    }
});

function createLI(name) {
    const li = document.createElement('li');
//    li.textContent = name;
    const span = document.createElement('span');
    span.textContent = name;
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    const editButton = document.createElement('button');
    editButton.classList.add('editButton');
    editButton.textContent = 'edit';
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    removeButton.textContent = 'remove';
    
    li.appendChild(span);
    label.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    ul.appendChild(li);
}
ul.addEventListener('change', function (e) {
    if (e.target.type == 'checkbox') {
        //dom traversal from checkbox > label > li
        e.target.parentNode.parentNode.classList.toggle('responded');
    }
});
ul.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const button = event.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if (button.textContent == 'edit') {
            button.textContent = 'save';
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            input.focus();
        } else if (button.textContent === 'save') {
            button.textContent = 'edit';
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
        } else if (button.textContent == 'remove') {
            ul.removeChild(li);
        }
    }
});

guests.forEach((guest) => {
   createLI(guest); 
});