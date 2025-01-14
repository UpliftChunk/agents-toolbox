import {Navigate} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './component/layout/RootLayout.js';
import SearchPageAgents from './component/agent/SearchPageAgents.js';
import AgentDetails from './component/agent/AgentDetails.js';
import Jobs from './component/job/Jobs.js';
import JobDetails from './component/job/JobDetails.js';
import LoginRegister from './component/user/auth/LoginRegister.js';
import Notifications from './component/user/Profile/Notifications.js';
import UserDetails from './component/user/Profile/UserDetails.js';
// import MyRecruitments from './component/user/Profile/MyRecruitments.js';
import ExplorePageAgents from './component/agent/ExplorePageAgents.js';
import SettingsLayout from './component/option/SettingsLayout.js';
import MyAgents from './component/user/Profile/MyAgents.js';
import CreateAgent from './component/agent/CreateAgent.js';
import Dashboard from './component/user/Profile/Dashboard.js';
import CreateJob from './component/job/CreateJob.js';
import ProtectedPage from './component/user/auth/ProtectedPage.js';
import Loading from './component/Loading.js';

function App() {
  const Router = createBrowserRouter([
    {
      path: '*',
      element: <Navigate to={"/"}/>
    },
    {
      path : "/",
      element :<RootLayout/>,
      children:[
        {
          path : '',
          element : <SearchPageAgents/>
        },
        {
          path : 'explore',
          element : <ExplorePageAgents/>
        },
        {
          path : 'agent/:id',
          element : <AgentDetails/>
        },
        {
          path : 'account',
          element : <LoginRegister/>
        },
        {
          path : 'u',
          element : <ProtectedPage/>,
          children:[
            {
              path : 'jobs',
              element : <Jobs/>
            },
            {
              path : 'create-job',
              element : <CreateJob/>
            },
            {
              path : 'job/:id',
              element : <JobDetails/>
            },
            {
              path : 'create-agent',
              element : <CreateAgent/>
            },
            {
              path : 'notifications',
              element : <Notifications/>
            },
            {
              path : 'settings',
              element : <SettingsLayout/>,
              children:[
                {
                  path : 'profile',
                  element : <UserDetails/>
                },
                {
                  path : 'my-agents',
                  element : <MyAgents/>
                },
                {
                  path : 'dashboard',
                  element : <Dashboard/>
                },
              ]
            }
          ]
        },
        {
          path : 'loading',
          element : <Loading/>
        },
      ]
    },
    
  ]);

  return (
    <div className="App">
      {/* provide browser router */}
      <RouterProvider router={Router}/>
    </div>
  );
}

export default App;
