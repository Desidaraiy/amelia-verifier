import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface EntityAttributes {
  id: number;
  phone: string;
  verified: boolean;
  code?: string;
}

interface EntityCreationAttributes extends Optional<EntityAttributes, "id"> {}

class Entity
  extends Model<EntityAttributes, EntityCreationAttributes>
  implements EntityAttributes
{
  public id!: number;
  public phone!: string;
  public verified!: boolean;
  public code?: string;
}

Entity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "entities",
    sequelize,
  }
);

export default Entity;
