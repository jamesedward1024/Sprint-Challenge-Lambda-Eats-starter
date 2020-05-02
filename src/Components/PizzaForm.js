import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    Name: yup.string().required("Your name is required."),
    Size: yup.string().required("You must select a pizza size."),
    Crust: yup.string().required("You must select a pizza crust ")
  });

export default function PizzaForm() {
    const [formState, setFormState] = useState({
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
    })
    const [error, setErrorState] = useState({
        Name: "",
        Size: "",
        Crust: ""
    })
    const [order, setOrder] = useState([])
    const validation = e => { }

    const handleChange = e => {
        e.persist();
        const newData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

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
                        value={formState.Toppings.pepperoni}
                        checked={formState.Toppings.pepperoni} />

                </label>
                <label htmlFor="sausage">
                    Sausage
                    <input
                        type="checkbox"
                        name="sausage"
                        onChange={handleChange}
                        value={formState.Toppings.sausage}
                        checked={formState.Toppings.sausage} />

                </label>
                <label htmlFor="pineapple">
                    Pineapple
                    <input
                        type="checkbox"
                        name="pineapple"
                        onChange={handleChange}
                        value={formState.Toppings.pineapple}
                        checked={formState.Toppings.pineapple} />

                </label>
                <label htmlFor="bacon">
                    Bacon
                    <input
                        type="checkbox"
                        name="bacon"
                        onChange={handleChange}
                        value={formState.Toppings.bacon}
                        checked={formState.Toppings.bacon} />

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
