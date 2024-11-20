let credits = 0;
const site = 'http://127.0.0.1:3000';

function GetCredits(){
    ReadCredits();
    return credits;
}

async function ReadCredits(){
    try {
        const response = await fetch(site+'/api/credits/' + uuid);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        credits = data.credits;
    } catch (error) {
        console.error('Failed to update credits:', error);
    }
}

async function UpdateCredits(amount){
    await ReadCredits();
    credits += amount;
    try {
        const response = await fetch(site+'/api/credits/' + uuid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({credits})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Failed to set credits:', error);
    }
}

ReadCredits();