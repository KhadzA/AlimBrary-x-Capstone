const UserDashboardUI = ({ onViewBooks, onOpenLogoutModal }) => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>User</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={onViewBooks}>
                    View Books
                </button>
                <button onClick={onOpenLogoutModal}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboardUI;
