var uuid;
const site = 'https://backend.jelstgaming.yborolvest.nl'

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
        const response = await fetch(`${site}/api/users`, {
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

async function SetNickname(name){
    try{
        const response = await fetch(`${site}/api/users/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });

        if(!response.ok){
            throw new Error('Naam niet geupdatet: ' + response.statusText);
        }
    }
    catch (err){
        console.error(err);
    }
}

async function GetNickname(){
    try{
        const response = await fetch(`${site}/api/users/${uuid}`);

        if(!response.ok){
            throw new Error('Failed to get user');
        }

        const data = await response.json();
        return data.name;
    }
    catch (err){
        console.error(err);
    }
}

async function IsAvailable(name){
    try{
        const response = await fetch(`${site}/api/users/uq/${name}`);

        if(!response.ok){
            throw new Error('Failed to check name');
        }

        const data = await response.json();
        return data.isUnique;
    }
    catch (err){
        console.error(err);
    }
}

async function getTopPlayers(){
    try{
        const response = await fetch(`${site}/api/leaderboard`);

        if(!response.ok){
            throw new Error('Failed to get leaderboard');
        }

        return await response.json();
    }
    catch (err){
        console.error(err);
    }
}

initUser();