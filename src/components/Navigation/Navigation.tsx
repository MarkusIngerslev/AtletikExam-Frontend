import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div className="bg-light">
            <nav className="navbar navbar-expand-md navbar-light bg-light container">
                <Link className="navbar-brand" to="/">
                    Atletikstævne
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#navbarOffcanvasLg"
                    aria-controls="navbarOffcanvasLg"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="offcanvas offcanvas-start ps-3"
                    tabIndex={-1}
                    id="navbarOffcanvasLg"
                    aria-labelledby="navbarOffcanvasLgLabel"
                >
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/participants">
                                Deltagere
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/participants/new">
                                Opret deltager
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/results">
                                Resultater
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/results/new">
                                Opret nye resultater
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
