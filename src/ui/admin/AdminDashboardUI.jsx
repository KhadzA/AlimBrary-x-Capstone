const AdminDashboardUI = ({ onRedirect, onOpenLogoutModal }) => {
    return (
        <div>
            <h1>Admin</h1>
            <button onClick={() => onRedirect('/admin/books/addBook')}>Add Book</button>
            <br /><br />
            <button onClick={() => onRedirect('/admin/books/viewBooks')}>View Books</button>
            <br /><br />
            <button onClick={() => onRedirect('/admin/users/addUser')}>Add User</button>
            <br /><br />
            <button onClick={() => onRedirect('/admin/users/viewUsers')}>View Users</button>
            <br /><br />
            <button onClick={onOpenLogoutModal}>Logout</button>
        </div>
    );
};

export default AdminDashboardUI;
