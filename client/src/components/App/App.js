import React from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from 'generated/apollo-components';

const User = ({ id, name }) => {
  const [deleteUserMutation] = useDeleteUserMutation({
    variables: {
      where: {
        id,
      },
    },
    refetchQueries: ['users'],
  });

  return (
    <div>
      Id: {id}
      <br />
      Name: {name}
      <br />
      <button onClick={deleteUserMutation}>X</button>
    </div>
  );
};

const Users = () => {
  const { data, loading, error } = useUsersQuery();
  // console.log(data)
  // <pre>{JSON.stringify(data, null, 2)}</pre>;
  if (loading) {
    return 'Loading…';
  }
  if (error) {
    console.log(error);
    return 'Error…';
  }
  return data.users.map(({ id, name }) => (
    <User key={id} id={id} name={name} />
  ));
};

const CreateUser = () => {
  const [name, setName] = React.useState('');

  const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
    variables: {
      data: {
        name,
      },
    },
    refetchQueries: ['users'],
  });

  return (
    <form onSubmit={event => event.preventDefault()}>
      <label htmlFor="name-input">Name: </label>
      <input
        id="name-input"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button onClick={createUserMutation}>Add User</button>
    </form>
  );
};

const App = () => {
  return (
    <div>
      <Users />
      <CreateUser />
    </div>
  );
};

export default App;
