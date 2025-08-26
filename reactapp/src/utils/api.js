import { API_BASE_URL } from './constants';
//Causes
export async function getActiveCauses() {
    const res = await fetch(`${API_BASE_URL}api/causes/active`);
    if (!res.ok) throw new Error('Failed to fetch active causes');
    return res.json();
}

export async function getCauseById(id) {
    const res = await fetch(`${API_BASE_URL}api/causes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch cause');
    return res.json();
}

//NGOs
export async function getNGOs() {
    const res = await fetch(`${API_BASE_URL}api/ngos`);
    if (!res.ok) throw new Error('Failed to fetch NGOs');
    return res.json();
}

// Donations
export async function getDonationsByCause(causeId) {
    const res = await fetch(`${API_BASE_URL}api/donations/cause/${causeId}`);
    if (!res.ok) throw new Error('Failed to fetch donations');
    return res.json();
}

export async function submitDonation(donationData) {
    const res = await fetch(`${API_BASE_URL}api/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            causeId: donationData.causeId,
            donorName: donationData.donorName,
            donorEmail: donationData.donorEmail,
            amount: donationData.amount,
            message: donationData.message,
            isAnonymous: Boolean(donationData.isAnonymous)
        })
    });

    if (!res.ok) {
        throw new Error('Failed to submit donation');
    }
    return res.json();
}

// AUTH
export async function signup(userData) {
    const res = await fetch(`${API_BASE_URL}api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    return res.json();
}

export async function login(userData) {
    const res = await fetch(`${API_BASE_URL}api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    return res.json();
}
