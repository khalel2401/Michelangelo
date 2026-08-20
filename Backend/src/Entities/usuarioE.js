const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	name: "Usuario",
	tableName: "usuarios",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: "increment",
		},
		nombre: {
			type: "varchar",
			length: 50,
			nullable: false,
		},
		correo: {
			type: "citext",
			nullable: false,
			unique: true,
		},
		contrasenaHash: {
			type: "varchar",
			length: 100,
			nullable: false,
		},
		rol: {
			type: "enum",
			enum: ["admin", "usuario"],
			nullable: false,
		},
	},
});