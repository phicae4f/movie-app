import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ModalContainer } from "./components/ModalContainer";
import { GenresPage } from "./pages/GenresPage";
import { MoviePage } from "./pages/MoviePage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { FilteredMoviesPage } from "./pages/FilteredMoviesPage";
import { TrailerContainer } from "./components/TrailerContainer";

function App() {
  return (
    <BrowserRouter>
      <ModalContainer />
      <TrailerContainer />
      <Routes>
        <Route
          path="/"
          element={
              <Layout>
                <MainPage />
              </Layout>
          }
        />
        <Route
          path="/genres"
          element={
              <Layout>
                <GenresPage />
              </Layout>
          }
        />
        <Route
          path="/movies"
          element={
              <Layout>
                <FilteredMoviesPage />
              </Layout>
          }
        />
        <Route
          path="/movie/:id"
          element={
              <Layout>
                <MoviePage />
              </Layout>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <Layout>
                <MyProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
