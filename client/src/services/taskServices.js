const URI = 'http://localhost:8000';

const createTask = async (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('tag', data.tag);
    formData.append('date', data.date);
    formData.append('hour', data.hour);
    formData.append('img', data.img);
    formData.append('token', data.token);
    
    let request = await fetch(`${URI}/task/create`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getTasks = async (sessionToken) =>{
    let request = await fetch(`${URI}/task/show`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getTask = async (task_id, sessionToken) =>{
    let request = await fetch(`${URI}/task/show/${task_id}`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}
const updateTask = async (data, sessionToken) => {
    let xdata = {
        task_id: data.task_id,
        name: data.name,
        tag: data.tag,
        description: data.description,
        img: data.img,
        date: data.date,
        hour: data.hour,
        token: data.token
    }
    
    let request = await fetch(`${URI}/task/update`, {
        method: 'PUT',
        body: JSON.stringify(xdata),
        headers: {
            'Content-Type': 'application/json',
            'authToken': sessionToken
        }
    })
    return await request.json();
}

const deleteTask = async (task_id, sessionToken) => {
    
    let request = await fetch(`${URI}/task/delete/${task_id}`, {
        method: 'DELETE',
        headers: {
            'authToken': sessionToken
        }
    })
    return await request.json();
}

const date = (dd, mm, yy) =>{
    switch(mm){
      case '01':
        return `Enero ${dd}, ${yy}`;
        break;
      case '02':
        return `Febero ${dd}, ${yy}`;
        break;
      case '03':
        return `Marzo ${dd}, ${yy}`;
        break;
      case '04':
        return `Abril ${dd}, ${yy}`;
        break;
      case '05':
        return `Mayo ${dd}, ${yy}`;
        break;
      case '06':
        return `Junio ${dd}, ${yy}`;
        break;
      case '07':
        return `Julio ${dd}, ${yy}`;
        break;
      case '08':
        return `Agosto ${dd}, ${yy}`;
        break;
      case '09':
        return `Septiembre ${dd}, ${yy}`;
        break;
      case '10':
        return `Octubre ${dd}, ${yy}`;
        break;
      case '11':
        return `Noviembre ${dd}, ${yy}`;
        break;
      case '12':
        return `Diciembre ${dd}, ${yy}`;
        break;
    }
  }

module.exports = { 
    createTask, 
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    date
}