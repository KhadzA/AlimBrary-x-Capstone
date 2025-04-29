import Link from 'next/link';

const AddUserUI = ({ form, setForm, goHome, handleChange, handleAddUser }) => {
    return (
        <div>
            <button onClick={goHome}>Home</button>
            <Link href="/admin/users/viewUsers">View Users</Link>
            <h1>Add User</h1>
            <form onSubmit={handleAddUser(form, setForm)}>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange(setForm)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange(setForm)}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange(setForm)}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUserUI;
