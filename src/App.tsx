import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ParticipantsList from "./pages/ParticipantsList";
import ParticipantDetails from "./pages/ParticipantDetails";
import NewParticipant from "./pages/NewParticipant";

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/participants" element={<ParticipantsList />} />
                    <Route path="/participants/new" element={<NewParticipant />} />
                    <Route path="/participants/:id" element={<ParticipantDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
