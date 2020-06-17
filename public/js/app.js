const btn = document.querySelector('.add-term-btn');
const btnFind = document.querySelector('.find-term-btn');


async function handleClick(e) {
    e.preventDefault();
    const definition = document.querySelector('.add-definition').value.trim();
    const description = document.querySelector('.add-description').value.trim();
    const username = document.querySelector('.add-name').value.trim();
    const userSocialMedia = document.querySelector('.add-social-media').value.trim();

    try {
        const result = await fetch('/api/terms/add', {
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
        document.getElementById('add-form').reset();

    } catch (err) {
        console.log(err);
    }
}

async function search(e) {
    e.preventDefault();
    try {
        const term = document.querySelector('input[name="term"]').value.trim();
        const result = await fetch(`/api/terms/find/${term}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const res = await result.json();
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
}

btn.addEventListener('click', handleClick);
btnFind.addEventListener('click', search);

