module.exports=(Sequelize,DataTypes)=>{

    const User=Sequelize.define("User",{
        id:
        {type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        street:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        suite:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        zipcode:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lat:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lng:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        website:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        companyName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        companyCatchPhrase:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        companyBs:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
    
    return User
}