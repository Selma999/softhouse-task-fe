import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";

import "./App.css";
import UserInfo from "./components/UserInfo";

function App() {
  const [user, setUser] = useState();

  async function handleSubmit(values) {
    // Copy original fetched user object
    const userDataCopy = {
      ...user,
    };

    userDataCopy.firstName = values.firstName;
    userDataCopy.lastName = values.lastName;
    userDataCopy.email = values.email;

    try {
      const res = await axios.post(
        "http://localhost:3000/save-json",
        userDataCopy
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("https://randomuser.me/api/");

        const { results } = res.data;
        const userData = results?.[0];

        const newUserData = {
          ...userData,
          firstName: userData.name.first,
          lastName: userData.name.last,
        };

        delete newUserData.name;

        setUser(newUserData);
      } catch (err) {
        console.log("Failed to fetch data. Error:", err);
      }
    }

    getData();
  }, []);

  if (!user) return "Fetching user";

  return (
    <div className="container">
      <h1>Random user</h1>
      <div>
        <div>
          <UserInfo user={user} />
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <label htmlFor="firstName">First Name: </label>
              <Field id="firstName" name="firstName" placeholder="First name" />

              <br />
              <label htmlFor="lastName">Last Name: </label>
              <Field id="lastName" name="lastName" placeholder="Last name" />

              <br />
              <label htmlFor="email">Email: </label>
              <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />

              <br />
              <button type="submit">Save</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;
