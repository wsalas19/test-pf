const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email no valido'
        },
        isLowercase:{
          args: true,
          msg: 'El email debe ser en minuscula'
        }
      }
    },
    name: {                            //Nombre del usuario
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"El campo no puede estar vacio"
        },
        isAlpha:{
          args: true,
          msg:"El nombre solo puede contener letras"
        },
        len:{
          args:[3,70],
          msg:"El nombre tiene que ser entre 3 y 70 caracteres"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"El campo no puede estar vacio"
        },
        isAlpha:{
          args: true,
          msg:"El apellido solo puede contener letras"
        },
        len:{
          args:[3,70],
          msg:"El apellido tiene que ser entre 3 y 70 caracteres"
        }
      }
    },
    
    rol: {
      type: DataTypes.ENUM,
      values: ['user','superadmin','guest','admin','denegado'],
      defaultValue: 'user'
   },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
};
