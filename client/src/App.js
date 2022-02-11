import React, {Component} from 'react';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import CreateTask from './pages/PagesTaks/createTask';
import EditTask from './pages/PagesTaks/editTask';
import Profile from "./pages/PagesProfile/profile";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/dashboard/:id/add" element={<CreateTask />} />
          <Route path="/dashboard/:id/edit/:task_id" element={<CreateTask />} />
          <Route path="/dashboard/:id/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

