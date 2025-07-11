import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        surname: {
            type: String
        },
        username: {
            type: String,
            unique: true
        },
        academicCode: {
            type: String,
            uppercase: true,
            default: ''
        },
        mobilePhone: {
            type: String
        },
        country: {
            type: String    
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        profilePicture: {
            type: String
        },      
        rol: {
            type: String,
            uppercase: true,
            enum: ['ADMIN', 'STUDENT'],
            default: 'STUDENT'
        },
        reports: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Report',
                default: []
            }
        ],
        racha: {
            type: String,
            default: 'null'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject() 
    return user
}

export default model('Usuario', userSchema)