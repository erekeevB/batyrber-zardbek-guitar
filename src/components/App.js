import "../css/App.scss";
import React from "react";
import PageHeader from "./PageHeader";
import { Route, Routes } from "react-router-dom";
import IndividualGuitarPage from "../pages/IndividualGuitarPage";
import MainPage from "./MainPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PageFooter from "./PageFooter";
import GuitarListPage from "../pages/GuitarListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/shop" element={<GuitarListPage />}>
          <Route path="category/:category" element={<GuitarListPage />} />
        </Route>
        <Route path="item/:id" element={<IndividualGuitarPage />} />
      </Routes>
      <PageFooter />
      <ToastContainer position="bottom-right" pauseOnHover hideProgressBar />
    </QueryClientProvider>
  );
}

export default App;
