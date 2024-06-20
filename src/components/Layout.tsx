type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}

export default Layout;
