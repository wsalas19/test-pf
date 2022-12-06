
import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux'
import {postProducts} from '../redux/actions';
import styles from './CreateProduct.module.css'


export default function CreateProduct() {
	const dispatch = useDispatch();
	//const prod = useSelector((state) => state.products);

	const [sentForm, changeSentForm] = useState(false);

	return(
        <Fragment>
			<div className={styles.container}>
             <h1>Crear producto</h1>
                <Formik
                    initialValues={{

						name: "",
						image: "",
						price: "",
						description: "",
						material: "",
					}}
					validate={(values) => {
						let errors = {};

						if (!values.name) {
							errors.name = "Este campo es requerido";
						} else if (!/[a-zA-ZñÑ\s]{2,50}/.test(values.name)) {
							errors.name = "Debe contener solo letras y espacios";
						}

						if (!values.image) {
							errors.image = "Debe seleccionar una imagen";
						}

						if (!values.price) {
							errors.price = "Selecciona un precio";
						} else if (values.price < 0) {
							errors.price = "El precio debe ser mayor a 0";
						}


						if (!values.material) {
							errors.material = "Este campo es requerido";
						}else if (values.material === 'Sintetico'|| values.material === 'Artesanal' || values.material === 'Industrial') {
							errors.material = "Debe ser alguna opción Sintetico, Artesanal o Industrial.";

						}
						return errors;
					}}
					onSubmit={(values, { resetForm }) => {
						resetForm();
						dispatch(postProducts(values));
						changeSentForm(true);
						setTimeout(() => changeSentForm(false), 5000);
						console.log(values);
					}}

					>
						{({
							values,
							errors,
							handleSubmit,
							handleChange,
							setFieldValue,
							handleBlur,
						}) => (
							<Form className={styles.formulario} onSubmit={handleSubmit}>
								<div>
									<label>Nombre: </label>
									<Field type="text" id="name" name="name" />
									<ErrorMessage
										name="name"
										component={() => (
											<div className={styles.error}>{errors.name}</div>
										)}
										/>
								</div>

							<div>
								<label>Imagen: </label>
								<input
									accept="image/png,image/jpeg"
									type="file"
									id="image"
									name="image"
									onChange={(event) =>

									setFieldValue("image", event.currentTarget.files[0])
								}
									/>
									<ErrorMessage
										name="image"
										component={() => (
											<div className={styles.error}>{errors.image}</div>
										)}
									/>
								</div>

								<div>
									<label>Precio: </label>
									<Field type="number" id="price" name="price" />
									<ErrorMessage
										name="price"
										component={() => (
											<div className={styles.error}>{errors.price}</div>
										)}
									/>
								</div>

								<div>
									<label>Material: </label>
									<Field type="text" id="material" name="material" />
									<ErrorMessage
										name="material"
										component={() => (
											<div className={styles.error}>{errors.material}</div>
										)}
									/>
								</div>

							<div>
								<Field
									name="description"
									as="textarea"
									placeholder="Description"

									/>
								</div>
								<button type="submit">Añadir</button>
								{sentForm && (
									<p className={styles.exito}>
										¡El producto se ha añadido exitosamente!
									</p>
								)}
							</Form>
						)}
            	</Formik>
         	</div>

		</Fragment>
	);
}
