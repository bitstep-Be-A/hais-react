import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

import Layout from './pages/Layout';
import OAuthPage from './pages/OAuth';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import SubjectSearchPage from './pages/SubjectSearch';
import LoginPage from './pages/Login';
import SubjectRecommendPage from './pages/SubjectRecommend';
import OAuthLogout from './pages/OAuthLogout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path={routes.home.path} element={<HomePage/>}/>
          <Route path={routes.signup.path} element={<SignupPage/>}/>
          <Route path={`${routes.oauth.path}/:slug`} element={<OAuthPage/>}/>
          <Route path={routes.subjectSearch.path} element={<SubjectSearchPage/>}/>
          <Route path={routes.login.path} element={<LoginPage/>}/>
          <Route path={routes.subjectRecommend.path} element={<SubjectRecommendPage/>}/>
          <Route path={`/oauth/logout/:slug`} element={<OAuthLogout/>}/>
        </Route>
        <Route path={"/*"} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
