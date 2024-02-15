module.exports = (Sequelize, DataTypes) => {
    const Post = Sequelize.define("Post", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: "User",
        //   key: "id",
        // },
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
    return Post;
  };
  