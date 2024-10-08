import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { checkUserSession } from "./util/auth";

import LoginForm from "./components/auth/Login";
import Home from "./components/home/Home";
import SignUp from "./components/auth/SignUp";
const Dictionary = lazy(() => import("./components/Dictionary"));
const DefaultTexts = lazy(() => import("./components/books/DefaultTexts"));
const PDFReader = lazy(() => import("./components/PDFReader"));
const Decks = lazy(() => import("./components/decks/Decks"));
const FlashCards = lazy(() => import("./components/flashcards/FlashCards.jsx"));
const FlashcardDetails = lazy(() =>
  import("./components/flashcards/FlashcardDetails")
);
const Chat = lazy(() => import("./components/Chat"));
const Quiz = lazy(() => import("./components/flashcards/Quiz"));
const Stats = lazy(() => import("./components/Stats"));
import LandingPage from "./components/landing/Landing";
import RootLayout from "./components/root/Root";
import ProgressBar from "./components/ProgressBar";
import Stories from "./components/flashcards/Stories";
import ErrorPage from "./components/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: checkUserSession,
        },
        { path: "/login", element: <LoginForm /> },
        { path: "/signup", element: <SignUp /> },
        {
          path: "/dictionary",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <Dictionary />
            </Suspense>
          ),
          loader: checkUserSession,
        },
        {
          path: "/read",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <DefaultTexts />
            </Suspense>
          ),
          loader: checkUserSession,
        },
        {
          path: "/decks",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <Decks />
            </Suspense>
          ),
          loader: checkUserSession,
        },
        {
          path: "/flashcards",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <FlashCards />
            </Suspense>
          ),
          children: [
            {
              path: "detail/:id",
              element: (
                <Suspense fallback={<ProgressBar isLoading={true} />}>
                  <FlashcardDetails />
                </Suspense>
              ),
            },
            {
              path: "story",
              element: <Stories />,
            },
            {
              path: "quiz",
              element: (
                <Suspense fallback={<ProgressBar isLoading={true} />}>
                  <Quiz />
                </Suspense>
              ),
              loader: checkUserSession,
            },
          ],
          loader: checkUserSession,
        },
        {
          path: "/pdf",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <PDFReader />
            </Suspense>
          ),
          loader: checkUserSession,
        },
        {
          path: "/chat",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <Chat />
            </Suspense>
          ),
          loader: checkUserSession,
        },
        {
          path: "/stats",
          element: (
            <Suspense fallback={<ProgressBar isLoading={true} />}>
              <Stats />
            </Suspense>
          ),
          loader: checkUserSession,
        },
        { path: "/landing", element: <LandingPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
