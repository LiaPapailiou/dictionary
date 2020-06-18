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
        let term = document.querySelector('.find-single-term').value.trim();
        const sanitized = term.replace(term.charAt(0), term.charAt(0).toUpperCase());
        const result = await fetch(`/api/terms/find/${sanitized}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        // const resText = await result.text();
        // const res = await JSON.stringify(result);
        const res = await result.json();
        console.log(res);
        document.getElementById('find-form').reset();
        // if (res) {
        //     window.location.replace(`/api/terms/find/`);
        // }
    } catch (err) {
        console.log(err);
    }
}

if (btn) btn.addEventListener('click', handleClick);
if (btnFind) btnFind.addEventListener('click', search);
