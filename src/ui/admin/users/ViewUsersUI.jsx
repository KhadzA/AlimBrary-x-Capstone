import Link from 'next/link';

const ViewUsersUI = ({
    users,
    editingUserId,
    editForm,
    setEditForm,
    handleDelete,
    handleEdit,
    handleSave,
    goHome
}) => {
    return (
        <div>
            <button onClick={goHome}>Home</button>
            <Link href="/admin/users/addUser">Add User</Link>
            <h1>View Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {editingUserId === user.id ? (
                            <>
                                <input
                                    name="name"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                                <input
                                    name="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    value={editForm.password}
                                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                />
                                <button onClick={() => handleSave(user.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <strong>Name:</strong> {user.name} <br />
                                <strong>Email:</strong> {user.email} <br />
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewUsersUI;
