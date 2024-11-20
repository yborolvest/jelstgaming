var uuid;

async function initUser(){
    let uuidStorage = localStorage.getItem('uuid');
    let uuidCookie = document.cookie.split('; ').find(row => row.startsWith('uuid='));

    if(!uuidStorage && !uuidCookie){
        uuid = crypto.randomUUID();
        localStorage.setItem('uuid', uuid);

        document.cookie = `uuid=${uuid}; max-age=31536000; samesite=strict`

        await createUser(uuid);
    }
    else if (uuidStorage){
        uuid = uuidStorage;
        document.cookie = `uuid=${uuid}; max-age=31536000; samesite=strict`
    }
    else if (uuidCookie){
        uuid = uuidCookie.split('=')[1];
        localStorage.setItem('uuid', uuid);
    }
}

async function createUser(uuid){
    try{
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uuid})
        });

        if(!response.ok){
            throw new Error('Failed to create user');
        }
    }
    catch (err){
        console.error(err);
    }
}

async function setNickname(name){
    try{
        const response = await fetch(`/api/users/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });

        if(!response.ok){
            throw new Error('Failed to update name');
        }
    }
    catch (err){
        console.error(err);
    }
}

initUser();