const URI = 'http://localhost:8000';

const fetchRegister = async (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    let request = await fetch(`${URI}/user/register`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const fetchLogin = async (data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    let request = await fetch(`${URI}/user/login`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const fetchProfile = async (user_id, sessionToken) =>{
    let request = await fetch(`${URI}/user/profile/${user_id}`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}

module.exports = { 
    fetchRegister, 
    fetchLogin,
    fetchProfile
}