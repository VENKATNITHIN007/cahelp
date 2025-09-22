import mongoose , {Schema, model , models} from "mongoose";

export interface IClient{
        name:string;
        phoneNumber?:string;
        email?:string;
        type?:"Individual"|"Business"
        userId:mongoose.Types.ObjectId;
        firmId?:mongoose.Types.ObjectId;
        _id?:mongoose.Types.ObjectId;
        createdAt?:Date;
        updatedAt?:Date;
        }

const clientSchema = new Schema<IClient>({
        name:{type:String, required:true},
        phoneNumber:String,
        email:String,
        type:{type:String, required:true, enum:["Individual","Business"],default:"Individual" },
        userId:{type:Schema.Types.ObjectId,required:true, ref:"User"},
        firmId:{type:Schema.Types.ObjectId, ref:"Firm"},

},{
        timestamps:true
})

clientSchema.set("toJSON",{
        transform:(_doc,ret:any)=>{
                delete ret.createdAt
                delete ret.updatedAt
                delete ret.__v
                return ret
        }
})

const Client = models.Client || model<IClient>("Client",clientSchema)
export default Client;





























































































































































































































