const btn = document.querySelector('.add-term-btn');
const btnFind = document.querySelector('.find-term-btn');

async function handleClick(e) {
    e.preventDefault();
    const definition = document.querySelector('input[name="definition"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();
    const username = document.querySelector('input[name="username"]').value.trim();
    const userSocialMedia = document.querySelector('input[name="userSocialMedia"]').value.trim();

    const result = await fetch('http://localhost:5000/api/terms/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            definition,
            description,
            username,
            userSocialMedia
        })
    });
    await result.json();
}

async function search(e) {
    e.preventDefault();
    const term = document.querySelector('input[name="term"]').value.trim();
    const result = await fetch(`http://localhost:5000/api/terms/find/${term}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const res = await result.json();
    console.log(res);
}

btn.addEventListener('click', handleClick);
btnFind.addEventListener('click', search);

