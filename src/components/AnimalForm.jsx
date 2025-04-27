import React, { useState } from 'react';

const AnimalForm = ({ onSubmit, initialData }) => {
    const [animal, setAnimal] = useState(initialData || { name: '', age: '', species: '', breed: '' });

    const handleChange = (e) => {
        setAnimal({ ...animal, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(animal);
        setAnimal({ name: '', age: '', species: '', breed: '' }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={animal.name} onChange={handleChange} placeholder="Animal Name" required />
            <input name="age" value={animal.age} onChange={handleChange} placeholder="Age" required />
            <input name="species" value={animal.species} onChange={handleChange} placeholder="Species" required />
            <input name="breed" value={animal.breed} onChange={handleChange} placeholder="Breed" required />
            <button type="submit">Save Animal</button>
        </form>
    );
};

export default AnimalForm;