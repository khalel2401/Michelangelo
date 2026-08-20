const Joi = require("joi");

const usuarioSchema = Joi.object({
	nombre: Joi.string()
		.regex(/^[a-zA-Z\s]+$/)
		.min(3)
		.max(30)
		.required()
		.messages({
			invalid: "Nombre invalido",
			empty: "El nombre no puede estar vacio",
		}),

	correo: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			invalid: "Correo invalido",
			empty: "El correo no puede estar vacio",
		}),

	contrasena: Joi.string().min(8).required().messages({
		invalid: "Contraseña invalida",
		empty: "La contraseña no puede estar vacia",
	}),

	rol: Joi.string().valid("admin", "usuario").required().messages({
		invalid: "Rol invalido",
		empty: "El rol no puede estar vacio",
	}),
});

const updateUsuarioSchema = Joi.object({
	nombre: Joi.string()
		.regex(/^[a-zA-Z\s]+$/)
		.min(3)
		.max(30)
		.optional(),
	correo: Joi.string()
		.email({ tlds: { allow: false } })
		.optional(),
	contrasena: Joi.string().min(8).optional(),
	rol: Joi.string().valid("admin", "usuario").optional(),
}).min(1);

module.exports = { usuarioSchema, updateUsuarioSchema };