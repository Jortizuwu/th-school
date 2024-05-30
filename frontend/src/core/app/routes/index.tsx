import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Layout = lazy(() => import('../layout'));
const Home = lazy(() => import('../../pages/home'));

// students
const Student = lazy(() => import('../../pages/student'));
const CreateStudent = lazy(() => import('../../pages/student/components/form'));
const DetailsStudent = lazy(
  () => import('../../pages/student/components/details'),
);

// teachers
const Teacher = lazy(() => import('../../pages/teacher'));
const CreateTeacher = lazy(() => import('../../pages/teacher/components/form'));
const DetailsTeacher = lazy(
  () => import('../../pages/teacher/components/details'),
);

// class
const ClassRoom = lazy(() => import('../../pages/classroom'));
const CreateClassRoom = lazy(() => import('../../pages/classroom/components/form'));
const DetailsClassRoom = lazy(
  () => import('../../pages/classroom/components/details'),
);

import PageNotFound from '../../pages/404';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>Loading ...</span>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            {/* students */}
            <Route path='/students' element={<Student />} />
            <Route path='/students/create' element={<CreateStudent />} />
            <Route path='/students/details/:id' element={<DetailsStudent />} />
            <Route path='/students/update/:id' element={<CreateStudent />} />

            {/* teachers */}
            <Route path='/teachers' element={<Teacher />} />
            <Route path='/teachers/create' element={<CreateTeacher />} />
            <Route path='/teachers/details/:id' element={<DetailsTeacher />} />
            <Route path='/teachers/update/:id' element={<CreateTeacher />} />

            {/* class */}
            <Route path='/classroom' element={<ClassRoom />} />
            <Route path='/classroom/create' element={<CreateClassRoom />} />
            <Route
              path='/classroom/details/:id'
              element={<DetailsClassRoom />}
            />
            <Route path='/classroom/update/:id' element={<CreateClassRoom />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
