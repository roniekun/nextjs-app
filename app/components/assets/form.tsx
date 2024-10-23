import React, { useState, ChangeEvent, FormEvent } from "react";

// 1. Define a TypeScript interface for the User object
interface User {
  name: string;
  email: string;
  // Add other properties as needed, e.g., age?: number;
}

const CreateUserForm: React.FC = () => {
  // 2. Initialize state with the User interface
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
  });

  // 3. Type the handleChange function with ChangeEvent for input elements
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // 4. Type the createUser function with FormEvent for the form submission
  const createUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User created:", user);
    // Here, you would typically send 'user' to your backend or update your application's state
    // For example:
    // axios.post('/api/users', user)
    //   .then(response => { /* handle success */ })
    //   .catch(error => { /* handle error */ });
  };

  return (
    <form onSubmit={createUser}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
