import React from "react";
import Navigation from "./Navigation/Navigation";

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Navigation />
            <main>{children}</main>
        </div>
    );
}

export default Layout;
