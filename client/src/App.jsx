import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { UserProvider } from "./Context/User.Context";
import { AllEventsProvider } from "./Context/AllEvents.Context";
import { EventDetailProvider } from "./Context/Event.Context"; // ✅ Correct import

import LandingPage from "./Pages/LandingPage/LandingPage";
import Header from "./Components/Header/Header.component";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Events from "./Pages/Events/Events";
import EventDetail from "./Components/EventDetail/EventDetail.component";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddEvent from "./Pages/AddEvent/AddEvent";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Box minH="100vh">
                <Router>
                    <UserProvider>
                        <AllEventsProvider>
                            <EventDetailProvider>
                                <Header />
                                <Routes>
                                    <Route path="/" element={<LandingPage />} />
                                    <Route
                                        path="/register"
                                        element={<Register />}
                                    />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/events"
                                        element={<Events />}
                                    />
                                    <Route
                                        path="/events/:id"
                                        element={<EventDetail />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/addevent"
                                        element={<AddEvent />}
                                    />
                                </Routes>
                            </EventDetailProvider>
                        </AllEventsProvider>
                    </UserProvider>
                </Router>
            </Box>
        </ChakraProvider>
    );
}

export default App;
