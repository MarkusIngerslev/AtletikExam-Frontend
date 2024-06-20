import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ParticipantsList from "./pages/ParticipantsList";
import ParticipantDetails from "./pages/ParticipantDetails";
import NewParticipant from "./pages/NewParticipant";
import ResultsList from "./pages/ResultsList";
import NewResults from "./pages/NewResults";

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/participants" element={<ParticipantsList />} />
                    <Route path="/participants/new" element={<NewParticipant />} />
                    <Route path="/participants/:id" element={<ParticipantDetails />} />
                    <Route path="/results" element={<ResultsList />} />
                    <Route path="/results/new" element={<NewResults />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
