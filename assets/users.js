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

async function GetNextDailyDate() {
    try {
        // Fetch user data from the backend
        const response = await fetch(`${site}/api/users/${uuid}/daily-usage`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        // Assuming `lastDaily` is a timestamp (in milliseconds) stored in the user's data
        const lastDaily = new Date(userData.daily_usage);

        // Calculate the next available date for daily rewards
        const nextDailyDate = new Date(lastDaily.getTime() + 24 * 60 * 60 * 1000);

        return nextDailyDate; // Return as a Date object
    } catch (err) {
        console.error(err);
        return null; // Return null on error
    }
}

async function CheckDailyAvailable() {
    try {
        const nextDailyDate = await GetNextDailyDate();

        // If `nextDailyDate` is null, the daily reward is already available
        if (!nextDailyDate) {
            return true;
        }

        // Otherwise, compare the current time with the next daily date
        const now = new Date();
        return now >= nextDailyDate;
    } catch (err) {
        console.error(err);
        return false; // Return false on error, making the daily unavailable
    }
}

async function SetDailyUsed() {
    try {
        // Send a POST request to update the user's lastDaily field
        const response = await fetch(`${site}/api/users/${uuid}/daily-usage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to set daily: ${response.statusText}`);
        }

        console.log('Daily usage updated successfully.');
        return true; // Indicate success
    } catch (err) {
        console.error(err);
        return false; // Indicate failure
    }
}


initUser();