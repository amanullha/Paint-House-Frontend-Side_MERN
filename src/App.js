import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Footer from "./Layouts/Footer";
import NavBar from "./Layouts/NavBar";
import { publicRoutes } from "./Routes/publicRoutes";
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { privateRoutes } from "./Routes/privateRoutes";
import RequireAuth from "./Authentication/RequireAuth";
import NotFound from "./NotFound/NotFound";
import Dashboard from "./Pages/Dashboard";
import { dashboardAdminRoutes } from "./Routes/dashboardAdminRoutes";
import RequireAdmin from "./Authentication/RequireAdmin";
import { dashboardUsersRoutes } from "./Routes/dashboardUsersRoutes";

function App() {


  useEffect(() => {
    AOS.init();

  }, [])


  return (
    <div className="relative bg-white">

      <NavBar>

        <Routes>


          {/* public routes  */}

          {
            publicRoutes.map(({ Name, Component, Path }, i) => {
              return <Route path={Path} element={<Component />} key={i} />
            })
          }


          {/* Private routes */}

          <Route element={< RequireAuth />}>
            {
              privateRoutes.map(({ Path, Name, Component }, i) => <Route

                path={Path}
                element={<Component />}
                key={i}


              />)
            }

          </Route>


          <Route element={<RequireAuth />}>



            <Route element={<Dashboard />} >

              {
                dashboardAdminRoutes.map(({ Path, Name, Component }, i) => {

                  return (
                    <Route element={<RequireAdmin />}>
                      <Route path={Path} element={<Component />} />
                    </Route>
                  )

                })

              }

            </Route>


            <Route element={<Dashboard />} >

              {
                dashboardUsersRoutes.map(({ Path, Name, Component }, i) => {

                  return (
                    <Route path={Path} element={<Component />} />
                  )

                })

              }

            </Route>






          </Route>











          < Route path='*' element={<NotFound />} />

        </Routes>



        <Footer />

      </NavBar>

      <Toaster />

    </div>
  );
}

export default App;
