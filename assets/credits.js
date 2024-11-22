let credits = 0;

async function GetCredits(){
    await ReadCredits();
    return credits;
}

async function ReadCredits(){
    try {
        const response = await fetch(`${site}/api/credits/${uuid}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        credits = data.credits;
    } catch (error) {
        console.error('Failed to update credits:', error);
    }
}

async function AdjustCredits(amount){
    await ReadCredits();
    credits += amount;
    try {
        const response = await fetch(`${site}/api/credits/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({credits})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return credits;

    } catch (error) {
        console.error('Failed to set credits:', error);
    }
}

ReadCredits();