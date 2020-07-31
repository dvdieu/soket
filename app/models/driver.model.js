module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            driver_name:{type:String,default:""},
            car_no:{type:String,default:""},
            car_type:{type:String,default:""},
            mobile:{type:String,default:""},
            email:{type:String,default:""},
            address:{type:String,default:""},
            image:{type:String,default:""},
            point_lat:{type:Number,default:0.0},
            point_lng:{type:Number,default:0.0},
            status:{type:Number,default:0},
            in_trip_id:{type:String,default:""},
            auth_id:{type:String,default:""}
        }
        ,
        {timestamps: true}
    );
    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Driver = mongoose.model("driver", schema);
    return Driver;
};