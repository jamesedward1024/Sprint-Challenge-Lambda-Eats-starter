import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    Name: yup.string().min(2).required("Your name is required."),
    Size: yup.string().required("You must select a pizza size."),
    Crust: yup.string().required("You must select a pizza crust "),
    pepperoni: yup.boolean().oneOf([true], ""),
    sausage: yup.boolean().oneOf([true], ""),
    pineapple: yup.boolean().oneOf([true], ""),
    bacon: yup.boolean().oneOf([true], ""),
    onion:yup.boolean().oneOf([true], ""),
    Message:yup.string()
  });

export default function PizzaForm() {
    const [formState, setFormState] = useState({
        Name: "",
        Size: "",
        Crust: "",
        pepperoni: "",
        sausage: "",
        pineapple: "",
        bacon: "",
        onion:"",
        Message:""
    })
    const [error, setError] = useState({
        Name: ""
    })

    const [order, setOrder] = useState([])

    const Validation = e => {

        yup
          .reach(schema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setError({
              ...error,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setError({
              ...error,
              [e.target.name]: err.errors[0]
            });
          });
      };

    const handleChange = e => {
        e.persist();
        const newData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        Validation(e);
        setFormState(newData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(response => {
                setOrder(response.data);

                setFormState({
                    Name: "",
                    Size: "",
                    Crust: "",
                    Toppings: "",
                    pepperoni: "",
                    sausage: "",
                    pineapple: "",
                    bacon: "",
                    onion:"",
                    Message:""
                });
            })
            .catch(error => console.log(error));
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="Name">
                Name:
                <input
                    type="text"
                    value={formState.Name}
                    name="Name"
                    onChange={handleChange}
                />
            {error.Name.length > 0 ? <p>{error.Name}</p> : null}
            </label>

            <label htmlFor="Size">
                Select Pizza Size:
                 <select name="Size" onChange={handleChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">X-Large</option>
                </select>

            </label>

            <label htmlFor="Crust">
                Select Crust:
                <select name="Crust" onChange={handleChange}>
                    <option value="thin">Thin</option>
                    <option value="tossed">Hand Tossed</option>
                    <option value="deep">Deep Dish</option>
                 </select>
            </label>

            <div>
                Select Toppings:
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input
                        type="checkbox"
                        name="pepperoni"
                        onChange={handleChange}
                        value={formState.pepperoni}
                        checked={formState.pepperoni} />

                </label>
                <label htmlFor="sausage">
                    Sausage
                    <input
                        type="checkbox"
                        name="sausage"
                        onChange={handleChange}
                        value={formState.sausage}
                        checked={formState.sausage} />

                </label>
                <label htmlFor="pineapple">
                    Pineapple
                    <input
                        type="checkbox"
                        name="pineapple"
                        onChange={handleChange}
                        value={formState.pineapple}
                        checked={formState.pineapple} />

                </label>
                <label htmlFor="bacon">
                    Bacon
                    <input
                        type="checkbox"
                        name="bacon"
                        onChange={handleChange}
                        value={formState.bacon}
                        checked={formState.bacon} />

                </label>
            </div>

            <label htmlFor="Message">
                <input
                    type="textArea"
                    value={formState.Message}
                    name="Message"
                    onChange={handleChange}
                />
            </label>
            <button>Submit</button>
            <pre>{JSON.stringify(order, null, 2)}</pre>
        </form>
    );
}
