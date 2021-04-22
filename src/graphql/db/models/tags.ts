import { Post } from "./post";
import {
  BelongsToManySetAssociationsMixin,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import config from "../../../../config";
import restoreSequelizeAttributesOnClass from "./_tooling";

export interface TagsAttributes {
  id: number;
  name: string;
  desc: string;
  slug: string;
  type: string;
}

export interface TagsCreationAttributes
  extends Optional<TagsAttributes, "id"> {}

export class Tags
  extends Model<TagsAttributes, TagsCreationAttributes>
  implements TagsAttributes {
  public id!: number;
  public name!: string;
  public desc!: string;
  public slug!: string;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPosts!: HasManyGetAssociationsMixin<Post>; // Note the null assertions!
  public createPost!: HasManyCreateAssociationMixin<Post>; // Note the null assertions!
  public hasPostById!: HasManyHasAssociationMixin<Post, Post["id"]>;
  public countPosts!: HasManyCountAssociationsMixin;
  public setPosts!: BelongsToManySetAssociationsMixin<Post, Post["id"]>;

  constructor(...args) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this, [
      "getPosts",
      "createPost",
      "countPosts",
      "hasPostById",
    ]);
  }
}

export default function initTags(sequelize) {
  Tags.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: config.defaultTitle,
      },
      desc: {
        type: DataTypes.STRING,
        defaultValue: config.defaultTitle,
      },
      slug: {
        type: DataTypes.STRING,
        defaultValue: config.defaultTitle,
        get() {
          return "/tag/" + this.slug;
        },
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: config.defaultTitle,
      },
    },
    {
      tableName: "tags",
      sequelize, // passing the `sequelize` instance is required
    },
  );

  return Tags;
}

export function associateTags(): void {
  // Here we associate which actually populates out pre-declared `association` static and other methods.
  Tags.belongsToMany(Post, {
    through: "postTags",
    foreignKey: "tag_id",
  });
}
