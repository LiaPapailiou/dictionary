const btn = document.querySelector('button[type="submit"]');

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
    const content = await result.json();

}
btn.addEventListener('click', handleClick);